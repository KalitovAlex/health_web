"use client";

import { Button } from "antd";
import { useSessionStore } from "@/entities/session";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { logout } = useSessionStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Button type="primary" onClick={handleLogout} className="hover:opacity-90">
        Logout
      </Button>
    </div>
  );
}
