"use client";

import { INSUFFICIENT_WEIGHT, NORMAL_WEIGHT, OVERWEIGHT_WEIGHT, OBESITY_WEIGHT, BMI_TITLE } from "../models";
export const CalculatorResult = ({ height, weight }: { height: number, weight: number }) => {
  const heightInMeters = height / 100;
  const bmi = Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
  
  const getBmiStatus = (bmi: number) => {
    if (bmi < 18.5) return INSUFFICIENT_WEIGHT;
    if (bmi < 25) return NORMAL_WEIGHT;
    if (bmi < 30) return OVERWEIGHT_WEIGHT;
    return OBESITY_WEIGHT;
  };

  return (
    <div className="p-5 bg-[#435B45] text-white rounded-xl">
      <h2 className="text-xl mb-4">{BMI_TITLE}</h2>
      <div className="text-5xl font-bold mb-4">{bmi}</div>
      
      <div className="bg-[#C5E1A5] rounded-full p-2 inline-block text-black mb-6">
        {getBmiStatus(bmi)}
      </div>

      <div className="relative h-2 bg-gradient-to-r from-[#90CAF9] via-[#A5D6A7] to-[#EF9A9A] rounded-full">
        <div 
          className="absolute w-3 h-3 bg-white rounded-full -top-0.5"
          style={{ 
            left: `${Math.min(Math.max(((bmi - 15) / (40 - 15)) * 100, 0), 100)}%` 
          }}
        />
      </div>
      
      <div className="flex justify-between mt-1 text-sm">
        <span>15</span>
        <span>21.25</span>
        <span>27.5</span>
        <span>33.75</span>
        <span>40</span>
      </div>
    </div>
  );
};
