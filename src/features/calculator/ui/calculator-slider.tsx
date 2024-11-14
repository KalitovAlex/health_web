"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export const CalculatorSlider = ({
  name,
  min,
  max,
  unit,
  value,
  onChange,
}: {
  name: string;
  min: number;
  max: number;
  unit: string;
  value: number;
  onChange: (value: number) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;

    const newValue = Math.round(
      Math.min(Math.max(min + percentage * (max - min), min), max)
    );
    onChange(newValue);
  };

  return (
    <div className="w-[250px] mb-5 md:mb-0 ">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-medium text-white">{name}</span>
        <span className="text-sm font-medium text-white/80">
          {value} {unit}
        </span>
      </div>

      <div className="relative">
        <div
          className="h-2 w-full bg-white/10 rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="absolute w-full h-full flex items-center justify-between px-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-0.5 h-1 bg-white/30" />
            ))}
          </div>

          <motion.div
            className="absolute h-full bg-white/30 rounded-full"
            style={{
              width: `${((value - min) / (max - min)) * 100}%`,
            }}
            animate={{ width: `${((value - min) / (max - min)) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          <motion.div
            className="absolute w-4 h-4 bg-white rounded-full -top-1.5 shadow-lg"
            style={{
              left: `calc(${((value - min) / (max - min)) * 100}% - 0.5rem)`,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-xs text-white/60">{min}</span>
          <span className="text-xs text-white/60">{max}</span>
        </div>
      </div>
    </div>
  );
};
