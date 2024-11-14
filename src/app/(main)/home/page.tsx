"use client";

import { DashboardWidget } from "@/widgets/dashboard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/entities/user";

export default function HomePage() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user?.isDoctor) {
      router.replace("/patients");
    }
  }, [user, router]);

  if (user?.isDoctor) {
    return null;
  }

  return <DashboardWidget />;
}
