import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import api from '../api.ts';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
//import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import {
  Snackbar as MuiSnackbar,
  Alert as MuiAlert,
} from "@mui/material";
//import { getToken, setToken } from ".services/localStorageService";
import { getToken, setToken, removeToken } from "../services/localStorageService.ts";
interface LoginModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

interface TokenPayload {
  sub: string;  // userId hoặc username
  exp: number;
  iat: number;
  scope: string;
}

export interface ApiResponse<T> {
  code: number;
  message?: string;
  result: T;
}

export interface AuthenticationResponse {
  token: string;
  authenticated: boolean;
}

export interface IntrospectResponse {
  valid: boolean;
}


const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");





  useEffect(() => {
    const accessToken = getToken();
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  const handleCloseSnackBar = (_: any, reason?: string) => {
    if (reason === "clickaway") return;
    setSnackBarOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post<ApiResponse<AuthenticationResponse>>("/auth/token", {
        // method: "POST",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({
        //   username: username,
        //   password: password,
        // }),
         username,
        password,
      });
      if (response.data.code !== 1000) {
        throw new Error("Failed to fetch playlists");
      }

      // const data = await response.json();
      // console.log("Response body:", data);

      if (response.data.code !== 1000) {
        throw new Error(response.data.message);
      }

      const token = response.data.result.token;
      setToken(token);

      const decoded = jwtDecode<TokenPayload>(token);
      const scopes = decoded.scope.split(" ");
      console.log("Scopes:", scopes);
      let newRole: string | null = null;
      console.log("Decoded token:", decoded);
      console.log("Decoded token:", decoded.scope);
      if (scopes.includes("ROLE_ADMIN")) {
        localStorage.setItem("role", "ROLE_ADMIN");
        newRole = "ROLE_ADMIN";
      } else {
        localStorage.setItem("role", "ROLE_USER");
        newRole = "ROLE_USER";
      }
      console.log("Role:", newRole);
      //setRoleState(newRole);
      localStorage.setItem("userId", decoded.sub);
      navigate("/"); // điều hướng về home
      onClose();
    } catch (error: any) {
      setSnackBarMessage(error.message);
      setSnackBarOpen(true);
    }
  };

  return (
    <>
      <Snackbar
        open={snackBarOpen}
        onClose={handleCloseSnackBar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>

      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Log In</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 
                   111.414 1.414L11.414 10l4.293 4.293a1 1 0 
                   01-1.414 1.414L10 11.414l-4.293 4.293a1 
                   1 0 01-1.414-1.414L8.586 10 4.293 
                   5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="login-username"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-700 text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-full font-medium hover:bg-green-600 transition"
            >
              Log In
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-400">
            <p>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => {
                  onClose();
                  alert("Chuyển qua Sign Up modal");
                }}
                className="text-green-500 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;