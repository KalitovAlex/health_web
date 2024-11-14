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
      whileHover={{ scale: 1.01 }}
      className={cn(
        "glass-card bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] rounded-2xl w-full shadow-lg border border-white/10 p-4 md:p-6",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 md:p-2.5 bg-white/10 rounded-xl backdrop-blur-sm">
            <div className="text-white w-5 h-5 md:w-6 md:h-6">{icon}</div>
          </div>
          <span className="text-base md:text-lg text-white font-medium">{title}</span>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="flex flex-col justify-center md:w-1/4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-bold text-white">{valueData}</span>
            <span className="text-base md:text-lg text-white/80">{unitData}</span>
          </div>
          {data && (
            <div className="inline-flex mt-2 px-2 py-1 bg-white/10 rounded-full w-fit">
              <span className="text-xs font-medium text-white/80">Текущее значение</span>
            </div>
          )}
        </div>

        {data !== undefined ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 h-[120px] md:h-[150px]"
          >
            <IndicatorsAdditionalChart
              color={"rgba(255,255,255,0.8)"}
              data={data}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <span className="text-base text-white/60">Данные отсутствуют</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
