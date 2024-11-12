"use client";

import { NextPage } from "next";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface Props {
  navigationPath: string;
  iconPath: string;
  className?: string;
}

export const SideBarButton: NextPage<Props> = ({
  navigationPath,
  iconPath,
  className,
}) => {
  const router = useRouter();
  const pathName = usePathname();

  const onClick = () => {
    router.push(navigationPath);
  };

  return (
    <button
      className={twMerge(
        "flex flex-col items-center gap-y-1 bg-white rounded-xl hover:bg-sidebar-secondary p-3 transition-colors duration-200 group",
        pathName === navigationPath && "bg-sidebar-secondary",
        className
      )}
      onClick={onClick}
    >
      <Image
        src={iconPath}
        alt={navigationPath}
        className={twMerge(
          "hover:scale-110 w-15 h-15 rounded-md transition-all duration-200 group-hover:brightness-0 group-hover:invert",
          pathName === navigationPath && "brightness-0 invert scale-110"
        )}
      />
    </button>
  );
};
