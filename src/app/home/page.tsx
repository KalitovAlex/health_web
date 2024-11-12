"use client";

import { Button } from "antd";
import { useSessionStore } from "@/entities/session";
import { useRouter } from "next/navigation";
import { AUTH } from "@/shared/config/routes";
import { useState } from "react";
import IndicatorAddModal from "@/features/dashboard/ui/modal/indicator-add-modal";

export default function HomePage() {
  const [indicatorAddModalOpen, setIndicatorAddModalOpen] = useState(false);
  const { logout } = useSessionStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push(AUTH);
  };

  const handleOpenIndicatorAddModal = () => {
    setIndicatorAddModalOpen(true);
  };

  const handleCloseIndicatorAddModal = () => {
    setIndicatorAddModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Button
        type="primary"
        onClick={handleOpenIndicatorAddModal}
        className="hover:opacity-90"
      >
        Add Indicator
      </Button>
      <IndicatorAddModal
        title="Температура"
        open={indicatorAddModalOpen}
        onClose={handleCloseIndicatorAddModal}
      />
    </div>
  );
}
