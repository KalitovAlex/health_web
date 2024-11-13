"use client";

import { cn } from "@/shared/utils/lib/cn";
import { IndicatorsAdditionalChart } from "./indicators-additional-chart";
import { motion } from "framer-motion";
import { IndicatorChartData, IndicatorData } from "../types/indicators-types";
import { useEffect } from "react";
import { useState } from "react";

export const IndicatorsChart = ({
  className,
  icon,
  title,
  data,
}: IndicatorData) => {
  const [chartData, setChartData] = useState<IndicatorChartData[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (!data) return;
    const tableData: IndicatorChartData[] = data.map((item) => ({
      name: item.name,
      value: item.value,
      unit: item.unit,
    }));
    setChartData(tableData);
  }, [data]);

  const valueData = chartData ? chartData[chartData.length - 1].value : "N/A";
  const unitData = chartData ? chartData[chartData.length - 1].unit : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "glass-card bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] rounded-2xl w-72 h-auto shadow-lg border border-white/10",
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
      </div>

      <div className="px-5 mt-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white">{valueData}</span>
          <span className="text-lg text-white/80">{unitData}</span>
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
            <IndicatorsAdditionalChart
              color={"rgba(255,255,255,0.8)"}
              data={data}
            />
          </div>
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
