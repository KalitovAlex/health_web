"use client";

import { useState } from "react";

export const CalculatorSlider = ({ 
  name, 
  min, 
  max, 
  unit,
  value,
  onChange 
}: { 
  name: string, 
  min: number, 
  max: number, 
  unit: string,
  value: number,
  onChange: (value: number) => void 
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
    
    const newValue = Math.round(Math.min(Math.max(min + (percentage * (max - min)), min), max));
    onChange(newValue);
  };

  return (
    <div className="flex flex-col items-center gap-2 select-none m-5">
      <div className="relative w-[200px] bg-green-100 p-4 rounded-2xl">
      <div className="text-2xl text-center mb-4">{name}</div>
        <div 
          className="h-8 w-full bg-neutral-100 rounded-full relative cursor-pointer"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="absolute w-full h-full flex items-center justify-between px-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-0.5 h-3 bg-neutral-400" />
            ))}
          </div>
          
          <div 
            className="absolute w-1 h-full bg-red-500 transition-all duration-75"
            style={{
              left: `${Math.min(((value - min) / (max - min)) * 100, 99.5)}%`
            }}
          />
        </div>
        
        <div className="text-center mt-2">
          <span className="text-xl">{value} {unit}</span>
        </div>
      </div>
    </div>
  );
};