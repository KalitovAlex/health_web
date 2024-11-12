"use client";

import { cn } from "@/shared/utils/lib/cn";
import type { DashboardProps } from "../types";

export const Dashboard = ({ className }: DashboardProps) => {
  return <div className={cn("", className)}>Dashboard Component</div>;
};
