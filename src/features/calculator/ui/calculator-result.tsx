"use client";

import { motion } from "framer-motion";
import {
  INSUFFICIENT_WEIGHT,
  NORMAL_WEIGHT,
  OVERWEIGHT_WEIGHT,
  OBESITY_WEIGHT,
  BMI_TITLE,
} from "../models";
export const CalculatorResult = ({
  height,
  weight,
}: {
  height: number;
  weight: number;
}) => {
  const heightInMeters = height / 100;
  const bmi =
    Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;

  const getBmiStatus = (bmi: number) => {
    if (bmi < 18.5) return INSUFFICIENT_WEIGHT;
    if (bmi < 25) return NORMAL_WEIGHT;
    if (bmi < 30) return OVERWEIGHT_WEIGHT;
    return OBESITY_WEIGHT;
  };

  return (
    <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
      <h2 className="text-xl font-medium text-white mb-4">{BMI_TITLE}</h2>

      <div className="text-5xl font-bold text-white mb-4">{bmi}</div>

      <div className="inline-flex px-4 py-2 bg-white/10 rounded-full mb-6">
        <span className="text-sm font-medium text-white">
          {getBmiStatus(bmi)}
        </span>
      </div>

      <div className="space-y-4">
        <div className="relative h-2 bg-gradient-to-r from-[var(--status-low)] via-[var(--status-normal)] to-[var(--status-high)] rounded-full">
          <motion.div
            className="absolute w-4 h-4 bg-white rounded-full -top-1 shadow-lg"
            style={{
              left: `${Math.min(
                Math.max(((bmi - 15) / (40 - 15)) * 100, 0),
                100
              )}%`,
            }}
            animate={{
              left: `${Math.min(
                Math.max(((bmi - 15) / (40 - 15)) * 100, 0),
                100
              )}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        <div className="flex justify-between text-sm text-white/60">
          <span>15</span>
          <span>21.25</span>
          <span>27.5</span>
          <span>33.75</span>
          <span>40</span>
        </div>
      </div>
    </div>
  );
};
