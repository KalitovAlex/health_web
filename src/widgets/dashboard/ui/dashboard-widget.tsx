"use client";

import { Calculator } from "@/features/calculator/ui";
import { DashboardIndicators } from "@/features/dashboard/ui";
import { Recommendations } from "@/features/recommendations/ui";
import { motion } from "framer-motion";

export const DashboardWidget = () => {
  const currentDate = new Date().toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between w-full"
    >
      <div className="w-1/2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-col items-start ml-10"
        >
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">
            Информация о здоровье
          </h1>
          <p className="text-sm mt-1 text-[var(--foreground)] opacity-60">
            {currentDate}
          </p>
        </motion.div>
        <DashboardIndicators />
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-screen">
        <Calculator />
        <Recommendations />
      </div>
    </motion.div>
  );
};
