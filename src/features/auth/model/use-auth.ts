import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import { QUERY_KEYS } from "@/shared/enums/query-keys";
import { useSessionStore } from "@/entities/session";
import { useUserStore } from "@/entities/user";
import { HOME } from "@/shared/router/routes";
import { config } from "@/shared/config";
import { AuthFormData } from "../types";

export const useAuth = () => {
  const router = useRouter();
  const setIsAuthenticated = useSessionStore((state) => state.setIsAuthenticated);
  const fetchUser = useUserStore((state) => state.fetchUser);

  const { mutateAsync: login, isPending, error } = useMutation({
    mutationKey: [QUERY_KEYS.AUTH],
    mutationFn: async (credentials: AuthFormData) => {
      const data = await authApi.login(credentials);
      
      // Store tokens
      localStorage.setItem(config.auth.JWT.ACCESS_TOKEN, data.accessToken);
      localStorage.setItem(config.auth.JWT.REFRESH_TOKEN, data.refreshToken);
      
      // Set HTTP-only cookie for refresh token
      await fetch("/api/auth/set-token", {
        method: "POST",
        body: JSON.stringify({ token: data.refreshToken }),
      });
      
      return data;
    },
    onSuccess: async () => {
      setIsAuthenticated(true);
      await fetchUser(); // Fetch user data after successful login
      router.push(HOME);
    },
  });

  return {
    login,
    isPending,
    error,
  };
};
