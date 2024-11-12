"use client";

import { NextPage } from "next";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface Props {
  navigationPath: string;
  iconPath: string;
  label: string;
  subLabel?: string;
  badge?: string;
  className?: string;
}

export const SideBarButton: NextPage<Props> = ({
  navigationPath,
  iconPath,
  label,
  subLabel,
  badge,
  className,
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const isActive = pathName === navigationPath;

  const onClick = () => {
    router.push(navigationPath);
  };

  return (
    <button
      className={twMerge(
        "flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors duration-200 group",
        isActive
          ? "bg-[var(--sidebar-item-active)] text-[var(--sidebar-text-active)]"
          : "text-[var(--sidebar-text)] hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--sidebar-text-active)]",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-x-3">
        <Image
          src={iconPath}
          alt={navigationPath}
          className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100"
          width={20}
          height={20}
        />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">{label}</span>
          {subLabel && (
            <span className="text-xs font-bold text-[var(--sidebar-text)]">
              {subLabel}
            </span>
          )}
        </div>
      </div>

      {badge && (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-[var(--sidebar-badge)] text-white">
          {badge}
        </span>
      )}
    </button>
  );
};
