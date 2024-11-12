"use client";

import { useSessionStore } from "@/entities/session";
import { useRouter } from "next/navigation";
import { DashboardIndicator } from "@/features/dashboard/ui/dashboard-indicator";
import { HeartPulse } from "lucide-react";

export default function HomePage() {
  const { logout } = useSessionStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <DashboardIndicator
        icon={<HeartPulse size={36} />}
        iconColor="red-500"
        title="Частота сердебиения"
        value={72}
        unit="уд/мин"
      />
    </div>
  );
}
