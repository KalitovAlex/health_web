"use client";

import { Calculator } from "@/features/calculator/ui";
import { DashboardIndicators } from "@/features/dashboard/ui";

export const DashboardWidget = () => {
  const currentDate = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="flex items-center justify-between w-full">
      <div className="w-1/2">
        <div className="flex flex-col items-start ml-10">
          <h1 className="text-2xl font-semibold">Информация о здоровье</h1>
          <p className="text-sm mt-1">
            {currentDate}
          </p>
        </div>
        <DashboardIndicators />
      </div>
      <div className="flex items-center justify-center w-1/2 h-screen">
        <Calculator />
      </div>
    </div>
  );
};
