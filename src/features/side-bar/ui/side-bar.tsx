import Image from "next/image";
import AppIcon from "@/../public/icons/app.svg";
import HomeIcon from "@/../public/icons/home.svg";
import CalendarIcon from "@/../public/icons/calendar.svg";
import MessageIcon from "@/../public/icons/message.svg";
import SettingsIcon from "@/../public/icons/settings.svg";
import LogoutIcon from "@/../public/icons/logout.svg";
import { SideBarButton } from "./side-bar-button";

export const SideBar = () => {
  return (
    <div className="hidden md:flex flex-col gap-y-2 overflow-auto bg-sidebar-background h-screen w-[100px] items-center p-2 pt-10 rounded-r-lg">
      <Image src={AppIcon} alt="App Icon" className="w-15 h-15" />

      <div className="flex flex-col gap-y-5 mt-14">
        <SideBarButton navigationPath="/home" iconPath={HomeIcon} />
        <SideBarButton navigationPath="/calendar" iconPath={CalendarIcon} />
        <SideBarButton navigationPath="/messages" iconPath={MessageIcon} />
        <SideBarButton navigationPath="/settings" iconPath={SettingsIcon} />
        <SideBarButton navigationPath="/logout" iconPath={LogoutIcon} />
      </div>
    </div>
  );
};
