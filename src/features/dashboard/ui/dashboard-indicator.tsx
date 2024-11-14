"use client";

import { cn } from "@/shared/utils/lib/cn";
import type { DashboardIndicatorProps } from "../types";
import { DashboardIndicatorChart } from "./dashboard-indicator-chart";
import { TrendingUp, TrendingDown, ArrowRight, Plus } from "lucide-react";
import { AVERAGE_VALUE, MAX_VALUE, MIN_VALUE } from "../model";
import { motion } from "framer-motion";

export const DashboardIndicator = ({
  className,
  icon,
  title,
  data,
  onAdd,
  footer,
}: DashboardIndicatorProps) => {
  const hasData = data && data.length > 0;
  const min = hasData
    ? data.reduce(
        (min, item) => (item.value < min ? item.value : min),
        data[0].value
      )
    : 0;
  const max = hasData
    ? data.reduce(
        (max, item) => (item.value > max ? item.value : max),
        data[0].value
      )
    : 0;
  const sum = hasData ? data.reduce((sum, item) => sum + item.value, 0) : 0;
  const average = hasData ? sum / data.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] rounded-2xl shadow-lg p-4 md:p-6 border border-white/10 backdrop-blur-sm w-full",
        className
      )}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-2 md:p-2.5 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-white w-5 h-5 md:w-6 md:h-6">{icon}</div>
            </div>
            <span className="text-base md:text-lg text-white font-medium">
              {title}
            </span>
          </div>

          <button
            className="p-1.5 md:p-2 hover:bg-white/10 rounded-xl transition-colors"
            onClick={onAdd}
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5 text-white/80" />
          </button>
        </div>

        {/* Value Display */}
        <div className="mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl md:text-4xl font-bold text-white">
              {hasData ? data[data.length - 1].value : "—"}
            </span>
            <span className="text-base md:text-lg text-white/80">
              {hasData ? data[data.length - 1].unit : ""}
            </span>
          </div>
          {hasData && (
            <div className="inline-flex mt-1 px-2 py-1 bg-white/10 rounded-full">
              <span className="text-xs font-medium text-white">Норма</span>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="flex-1 h-[80px] md:h-[100px]">
          {hasData && <DashboardIndicatorChart data={data} color={icon} />}
        </div>

        {/* Footer */}
        {footer && hasData && (
          <div className="flex justify-between items-center mt-3 text-center">
            <div className="flex flex-col items-center p-1.5 md:p-2 rounded-lg hover:bg-white/5 transition-colors">
              <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-[var(--status-low)] mb-1" />
              <span className="text-[10px] md:text-xs text-white/60">
                {MIN_VALUE}
              </span>
              <span className="text-xs md:text-sm font-semibold text-white">
                {min}
              </span>
            </div>
            <div className="flex flex-col items-center p-1.5 md:p-2 rounded-lg hover:bg-white/5 transition-colors">
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-[var(--status-normal)] mb-1" />
              <span className="text-[10px] md:text-xs text-white/60">
                {AVERAGE_VALUE}
              </span>
              <span className="text-xs md:text-sm font-semibold text-white">
                {average.toFixed(1)}
              </span>
            </div>
            <div className="flex flex-col items-center p-1.5 md:p-2 rounded-lg hover:bg-white/5 transition-colors">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-[var(--status-high)] mb-1" />
              <span className="text-[10px] md:text-xs text-white/60">
                {MAX_VALUE}
              </span>
              <span className="text-xs md:text-sm font-semibold text-white">
                {max}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
