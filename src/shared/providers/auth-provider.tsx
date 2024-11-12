"use client";

import { useEffect } from "react";
import { useSessionStore } from "@/entities/session";
import { useUserStore } from "@/entities/user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser().catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
    }
  }, [isAuthenticated, fetchUser]);

  return <>{children}</>;
} 