"use client";

import { useState } from "react";
import { CalculatorSlider } from "./calculator-slider";
import { CalculatorResult } from "./calculator-result";
import { HEIGHT_TITLE, WEIGHT_TITLE } from "../models";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/lib/cn";
import { CalculatorProps } from "../types";

export const Calculator = ({ className }: CalculatorProps) => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn("h-full", className)}
    >
      <div className="flex items-center justify-between h-full bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] rounded-2xl shadow-lg p-6 border border-white/10 backdrop-blur-sm">
        <div className="flex flex-col items-start justify-start gap-6 flex-1">
          <CalculatorSlider
            name={HEIGHT_TITLE}
            min={130}
            max={220}
            unit="см"
            value={height}
            onChange={setHeight}
          />
          <CalculatorSlider
            name={WEIGHT_TITLE}
            min={30}
            max={200}
            unit="кг"
            value={weight}
            onChange={setWeight}
          />
        </div>
        <div className="flex items-center justify-center pl-8 flex-1">
          <CalculatorResult height={height} weight={weight} />
        </div>
      </div>
    </motion.div>
  );
};
