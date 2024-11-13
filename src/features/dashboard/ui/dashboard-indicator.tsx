"use client";

import { cn } from "@/shared/utils/lib/cn";
import type { DashboardIndicatorProps } from "../types";
import { DashboardIndicatorChart } from "./dashboard-indicator-chart";
import { TrendingUp, TrendingDown, ArrowRight, Plus } from "lucide-react";
import { AVERAGE_VALUE, MAX_VALUE, MIN_VALUE, NORMAL_VALUE } from "../model";
import { motion } from "framer-motion";

export const DashboardIndicator = ({
  className,
  icon,
  title,
  data,
  onAdd,
  footer,
}: DashboardIndicatorProps) => {
  const min = data?.reduce(
    (min, item) => (item.value < min ? item.value : min),
    data[0].value
  );
  const max = data?.reduce(
    (max, item) => (item.value > max ? item.value : max),
    data[0].value
  );
  const sum = data?.reduce((sum, item) => sum + item.value, 0);
  const average = data ? sum! / data!.length : 0;

  const valueData = data ? data[data.length - 1].value : "N/A";
  const unitData = data ? data[data.length - 1].unit : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "glass-card bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] rounded-2xl w-full h-full shadow-lg border border-white/10",
        className
      )}
    >
      <div className="flex items-center justify-between px-5 pt-5">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm">
            <div className="text-white w-6 h-6">{icon}</div>
          </div>
          <span className="text-lg text-white font-medium">{title}</span>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          onClick={onAdd}
        >
          <Plus className="w-5 h-5 text-white/80" />
        </motion.button>
      </div>

      <div className="px-5 mt-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white">{valueData}</span>
          <span className="text-lg text-white/80">{unitData}</span>
        </div>

        <div className="inline-flex mt-3 px-3 py-1.5 bg-white/10 rounded-full">
          <span className="text-sm font-medium text-white">{NORMAL_VALUE}</span>
        </div>
      </div>

      {data !== undefined ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4"
        >
          <div className="px-2">
            <DashboardIndicatorChart
              color={"rgba(255,255,255,0.8)"}
              data={data}
            />
          </div>

          {footer && (
            <div className="grid grid-cols-3 gap-2 p-4 mt-2 bg-white/5 rounded-xl mx-4 mb-4">
              <div className="flex flex-col items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
                <TrendingDown className="w-4 h-4 text-[var(--status-low)] mb-1" />
                <span className="text-xs text-white/60">{MIN_VALUE}</span>
                <span className="text-sm font-semibold text-white">{min}</span>
              </div>

              <div className="flex flex-col items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
                <ArrowRight className="w-4 h-4 text-[var(--status-normal)] mb-1" />
                <span className="text-xs text-white/60">{AVERAGE_VALUE}</span>
                <span className="text-sm font-semibold text-white">
                  {average.toFixed(1)}
                </span>
              </div>

              <div className="flex flex-col items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
                <TrendingUp className="w-4 h-4 text-[var(--status-high)] mb-1" />
                <span className="text-xs text-white/60">{MAX_VALUE}</span>
                <span className="text-sm font-semibold text-white">{max}</span>
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-16"
        >
          <span className="text-lg text-white/60">Данные отсутствуют</span>
        </motion.div>
      )}
    </motion.div>
  );
};
