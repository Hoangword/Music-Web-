
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  scope: string;
  sub: string;
  exp: number;
  iat: number;
  jti: string;
}

const TOKEN_KEY = "token";
const ROLE_KEY = "role";

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const scopes = decoded.scope.split(" ");

    // nếu có ROLE_ADMIN thì set ADMIN, còn lại là USER
    if (scopes.includes("ROLE_ADMIN")) {
      localStorage.setItem(ROLE_KEY, "ADMIN");
    } else {
      localStorage.setItem(ROLE_KEY, "USER");
    }
  } catch (err) {
    console.error("Error decoding token", err);
  }
};

export const getUserId = (): string | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.sub; // backend map "sub" thành userId
  } catch (err) {
    console.error("Error decoding token", err);
    return null;
  }
};

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const getRole = () => localStorage.getItem(ROLE_KEY);
export const removeRole = () => localStorage.removeItem(ROLE_KEY);