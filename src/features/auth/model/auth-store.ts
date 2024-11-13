import { create } from "zustand";
import { AuthFormData, AuthState } from "../types";
import { useSessionStore } from "@/entities/session";
import { config } from "@/shared/config";
import { authApi } from "../api";

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,

  login: async (credentials: AuthFormData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authApi.login(credentials);
      
      // Сохраняем токены
      if (typeof window !== 'undefined') {
        localStorage.setItem(config.auth.JWT.ACCESS_TOKEN, response.accessToken);
        localStorage.setItem(config.auth.JWT.REFRESH_TOKEN, response.refreshToken);
      }

      // Устанавливаем HTTP-only cookie
      await fetch("/api/auth/set-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response.refreshToken }),
      });

      const sessionStore = useSessionStore.getState();
      sessionStore.setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async () => {
    try {
      set({ isLoading: true, error: null });
      const sessionStore = useSessionStore.getState();
      await sessionStore.refreshTokens();
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));
