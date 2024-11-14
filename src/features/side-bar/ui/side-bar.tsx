"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import AppIcon from "@/../public/icons/app.svg";
import HomeIcon from "@/../public/icons/home.svg";
import CalendarIcon from "@/../public/icons/calendar.svg";
import MessageIcon from "@/../public/icons/message.svg";
import SettingsIcon from "@/../public/icons/settings.svg";
import { SideBarButton } from "./side-bar-button";
import { UserDropdown } from "./user-dropdown";
import { SideBarSection } from "./side-bar-section";
import { motion, AnimatePresence } from "framer-motion";
import { MobileDrawer } from "./mobile-drawer";
import { useUserStore } from "@/entities/user";
import { Users, ClipboardList, Footprints, Moon } from "lucide-react";
import { useDoctorsStore } from "@/features/doctors/model/doctors-store";
import { useRouter } from "next/navigation";
import { DoctorsApi } from "@/features/doctors/api/doctors-api";

const healthIcon = (
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
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const sleepIcon = <Moon size={16} />;

const temperatureIcon = (
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
      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const stepsIcon = <Footprints size={16} />;

export const SideBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMetricsOpen, setIsMetricsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const user = useUserStore((state) => state.user);
  const doctors = useDoctorsStore((state) => state.doctors);
  const router = useRouter();
  const [requestsCount, setRequestsCount] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 500);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (user?.isDoctor) {
      DoctorsApi.getRequests().then((requests) => {
        const pendingRequests = requests.filter(
          (request) => !request.isApproved
        );
        setRequestsCount(pendingRequests.length);
      });
    }
  }, [user?.isDoctor]);

  const renderMainSection = () => {
    if (user?.isDoctor) {
      return (
        <SideBarSection title="Управление">
          <SideBarButton
            navigationPath="/patients"
            icon={<Users className="w-5 h-5" />}
            label="Мои пациенты"
          />
          <SideBarButton
            navigationPath="/requests"
            icon={<ClipboardList className="w-5 h-5" />}
            label="Заявки"
            badge={
              requestsCount ? (
                <div className="px-2 py-0.5 min-w-[20px] h-5 rounded-full bg-white/25 text-white text-xs font-medium flex items-center justify-center">
                  {requestsCount}
                </div>
              ) : undefined
            }
          />
        </SideBarSection>
      );
    }

    return (
      <SideBarSection title="Основное">
        <SideBarButton
          navigationPath="/home"
          iconPath={HomeIcon}
          label="Главная"
        />
        <SideBarButton
          navigationPath="/doctors"
          iconPath={CalendarIcon}
          label="Врачи"
          badge={doctors.length > 0 ? doctors.length.toString() : undefined}
        />

        {/* Metrics Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsMetricsOpen(!isMetricsOpen)}
            className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors duration-200 group
              ${
                isMetricsOpen
                  ? "bg-[var(--sidebar-item-active)] text-[var(--sidebar-text-active)]"
                  : "text-[var(--sidebar-text)] hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--sidebar-text-active)]"
              }`}
          >
            <div className="flex items-center gap-x-3">
              <Image
                src={MessageIcon}
                alt="metrics"
                className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100"
                width={20}
                height={20}
              />
              <span className="text-sm font-medium">Показатели</span>
            </div>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                isMetricsOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <AnimatePresence>
            {isMetricsOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <motion.div
                  className="pl-11 mt-1 space-y-1"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    onClick={() => router.push("/indicators/health")}
                    className="flex items-center gap-x-2 px-3 py-1.5 text-sm text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-active)] hover:bg-[var(--sidebar-item-hover)] rounded-lg transition-colors duration-200"
                  >
                    {healthIcon}
                    <span>Здоровье</span>
                  </div>
                  <div
                    onClick={() => router.push("/indicators/sleep")}
                    className="flex items-center gap-x-2 px-3 py-1.5 text-sm text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-active)] hover:bg-[var(--sidebar-item-hover)] rounded-lg transition-colors duration-200"
                  >
                    {sleepIcon}
                    <span>Часы сна</span>
                  </div>
                  <div
                    onClick={() => router.push("/indicators/temperature")}
                    className="flex items-center gap-x-2 px-3 py-1.5 text-sm text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-active)] hover:bg-[var(--sidebar-item-hover)] rounded-lg transition-colors duration-200"
                  >
                    {temperatureIcon}
                    <span>Температура</span>
                  </div>
                  <div
                    onClick={() => router.push("/indicators/steps")}
                    className="flex items-center gap-x-2 px-3 py-1.5 text-sm text-[var(--sidebar-text)] hover:text-[var(--sidebar-text-active)] hover:bg-[var(--sidebar-item-hover)] rounded-lg transition-colors duration-200"
                  >
                    {stepsIcon}
                    <span>Шагов за день</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SideBarSection>
    );
  };

  const sidebarContent = (
    <>
      <div className="flex items-center gap-x-3 px-4 mb-8">
        <Image
          src={AppIcon}
          alt="Логотип"
          className="w-8 h-8 brightness-0 invert"
        />
        <div className="flex flex-col">
          <span className="text-base font-semibold text-white">
            Медицинский центр
          </span>
          <span className="text-xs text-[var(--sidebar-text)]">
            medical-app.ru
          </span>
        </div>
      </div>

      {/* Navigation Container - добавляем flex-1 */}
      <div className="flex-1 flex flex-col">
        {renderMainSection()}

        <SideBarSection title="Настройки" className="mt-6">
          <SideBarButton
            navigationPath="/settings"
            iconPath={SettingsIcon}
            label="Настройки"
          />
        </SideBarSection>
      </div>

      <div
        className="relative pt-4"
        style={{ boxShadow: "0 -1px 0 var(--sidebar-border)" }}
      >
        <button
          className="w-full p-3 rounded-xl flex items-center gap-x-3 transition-colors duration-200 hover:bg-[var(--sidebar-item-hover)]"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user ? `${user.firstName[0]}${user.lastName[0]}` : ""}
              </span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[var(--sidebar-background)]" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-white">
              {user ? `${user.firstName} ${user.lastName}` : ""}
            </span>
            <span className="text-xs text-[var(--sidebar-text)]">
              {user?.isDoctor ? "Доктор" : "Пациент"}
            </span>
          </div>
          <svg
            className={`w-5 h-5 ml-auto text-[var(--sidebar-text)] transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <UserDropdown
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          isMobile={isMobile}
        />
      </div>
    </>
  );

  const mobileMenuButton = (
    <button
      className="fixed top-4 left-4 z-30 md:hidden bg-[var(--sidebar-background)] p-2 rounded-lg"
      onClick={() => setIsMobileMenuOpen(true)}
    >
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );

  return (
    <>
      <div className="hidden md:flex flex-col bg-[var(--sidebar-background)] h-screen w-[280px] py-6 px-4 rounded-r-[2rem] shadow-xl">
        {sidebarContent}
      </div>
      {isMobile && (
        <>
          {mobileMenuButton}
          <MobileDrawer
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {sidebarContent}
          </MobileDrawer>
        </>
      )}
    </>
  );
};
