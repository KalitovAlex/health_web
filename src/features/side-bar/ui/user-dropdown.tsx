"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSessionStore } from "@/entities/session";
import { AUTH } from "@/shared/router/routes";
import { Popover } from "antd";

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserDropdown = ({ isOpen, onClose }: UserDropdownProps) => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logout = useSessionStore((state) => state.logout);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push(AUTH);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProfile = () => {
    router.push("/profile");
    onClose();
  };

  const logoutConfirmContent = (
    <div className="p-4 bg-[var(--background)] rounded-xl border border-[var(--sidebar-border)]">
      <p className="text-sm text-[var(--foreground)] mb-4">
        Вы уверены, что хотите выйти?
      </p>
      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLogout();
          }}
          className="px-4 py-2 text-xs font-medium text-white bg-red-500 hover:opacity-80 rounded-lg transition-all duration-200 active:scale-[0.98]"
        >
          Выйти
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          className="px-4 py-2 text-xs font-medium text-[var(--foreground)] bg-[var(--sidebar-item-hover)] hover:opacity-80 rounded-lg transition-all duration-200 active:scale-[0.98]"
        >
          Отмена
        </button>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute bottom-[calc(100%+0.5rem)] left-0 w-full"
          style={{
            filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
            transformOrigin: "bottom",
          }}
        >
          <motion.div
            className="bg-[var(--background)] rounded-xl border border-[var(--sidebar-border)] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-1.5">
              <button
                onClick={handleProfile}
                className="w-full px-3 py-2 text-left text-sm text-[var(--foreground)] hover:opacity-70 rounded-lg transition-all duration-200 flex items-center gap-x-2 active:scale-[0.98]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <div className="flex-1">
                  <span className="font-medium">Профиль</span>
                </div>
              </button>
              <Popover
                content={logoutConfirmContent}
                trigger="click"
                placement="top"
                overlayClassName="logout-popover"
                overlayInnerStyle={{
                  padding: 0,
                  background: "transparent",
                  border: "none",
                }}
                align={{
                  offset: [0, 8],
                }}
              >
                <button className="w-full px-3 py-2 text-left text-sm text-red-600 hover:opacity-70 rounded-lg transition-all duration-200 flex items-center gap-x-2 active:scale-[0.98]">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Выйти
                </button>
              </Popover>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
