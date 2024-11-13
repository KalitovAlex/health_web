"use client";

import { useState } from "react";
import { CalculatorSlider } from "./calculator-slider";
import { CalculatorResult } from "./calculator-result";
import { HEIGHT_TITLE, WEIGHT_TITLE } from "../models";
import { motion } from "framer-motion";

export const Calculator = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full h-1/2"
    >
      <div className="flex items-center justify-between w-auto h-auto bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] mr-8 mt-8 rounded-2xl shadow-lg p-8 border border-white/10 backdrop-blur-sm">
        <div className="flex flex-col items-start justify-start w-auto gap-6">
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
        <div className="flex items-center justify-center w-full h-full pl-8">
          <CalculatorResult height={height} weight={weight} />
        </div>
      </div>
    </motion.div>
  );
};