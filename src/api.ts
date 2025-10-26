// src/api.ts
import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { getToken, setToken, removeToken } from "./services/localStorageService";

// ==== Interfaces trả về từ backend ====
export interface ApiResponse<T> {
  code: number;
  message?: string;
  result: T;
}

export interface AuthenticationResponse {
  token: string;
  authenticated: boolean;
}

// ======== BASE URL - chỉnh nếu cần ========
const BASE_URL = "http://localhost:8080";

// ======== axios instance ========
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ======== Request interceptor: đảm bảo headers tồn tại và gắn Authorization ========
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  const headers = config.headers as any;
  // đảm bảo headers luôn là một plain object để dễ set
  if (token) {
      console.log("[Axios] Gắn token vào request:", token);
    //headers["Authorization"] = `Bearer ${token}`;
    (config.headers as any)["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

// ======== Response interceptor: auto-refresh khi 401 ========
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token?: string | PromiseLike<string | undefined>) => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token?: string) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = (error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      headers?: unknown;
    }) || undefined;

    if (!originalRequest) return Promise.reject(error);
    if (error.response?.status !== 401) return Promise.reject(error);
    console.warn("[Axios] Gặp lỗi 401, cần refresh token...");

    if (originalRequest._retry) return Promise.reject(error);
    
    if (isRefreshing) {
      return new Promise<string | undefined>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
        console.log("[Axios] Retry request với token mới:", token);
        (originalRequest.headers = originalRequest.headers || {});

          if (token) {
            // đảm bảo headers kiểu plain object rồi attach
            (originalRequest.headers as any)["Authorization"] = `Bearer ${token}`;

          }
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const oldToken = getToken();
      console.log("[Axios] Token cũ:", oldToken);
      if (!oldToken) throw new Error("No token to refresh");

      // gọi refresh bằng axios (không dùng instance 'api' để tránh interceptor loop)
      const refreshRes = await axios.post<ApiResponse<AuthenticationResponse>>(
        `${BASE_URL}/auth/refresh`,
        { token: oldToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const newToken = refreshRes.data.result?.token;
      console.log("[Axios] Nhận token mới:", newToken);
      if (!newToken) throw new Error("Refresh did not return a token");

      // lưu token mới
      setToken(newToken);

      // cập nhật header mặc định cho instance (ép kiểu any để tránh lỗi type)
      (api.defaults.headers as any).common["Authorization"] = `Bearer ${newToken}`;

      processQueue(null, newToken);

      // attach token mới vào original request và retry
      (originalRequest.headers as any ?? (originalRequest.headers = {} as any))["Authorization"] = `Bearer ${newToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      console.error("[Axios] Refresh token thất bại:", refreshError);
      processQueue(refreshError, undefined);
      removeToken();
      // redirect to login (window vì file này không có access tới React Router)
      window.location.href = "/";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
