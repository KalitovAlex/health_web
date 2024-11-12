import axios from "axios";
import { config as appConfig } from "@/shared/config";
import { sessionApi } from "@/entities/session";

export const apiRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add request interceptor to include access token
apiRequest.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(appConfig.auth.JWT.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Add response interceptor to handle 401 errors
apiRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(
          appConfig.auth.JWT.REFRESH_TOKEN
        );
        if (!refreshToken) throw new Error("No refresh token");

        const response = await sessionApi.refreshToken(refreshToken);
        localStorage.setItem(
          appConfig.auth.JWT.ACCESS_TOKEN,
          response.accessToken
        );

        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
        return apiRequest(originalRequest);
      } catch (error) {
        localStorage.removeItem(appConfig.auth.JWT.ACCESS_TOKEN);
        localStorage.removeItem(appConfig.auth.JWT.REFRESH_TOKEN);
        window.location.href = "/auth";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
