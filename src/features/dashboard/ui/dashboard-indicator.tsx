import { cn } from "@/shared/utils/lib/cn";
import type { DashboardIndicatorProps } from "../types";
import { DashboardIndicatorChart } from "./dashboard-indicator-chart";
import { Plus } from "lucide-react";

export const DashboardIndicator = ({
  className,
  icon,
  iconColor,
  title,
  value,
  unit
}: DashboardIndicatorProps) => {
    const data = [
        { name: "3 сен", value: 100, unit: "уд/мин" },
        { name: "4 сен", value: 120, unit: "уд/мин" },
        { name: "5 сен", value: 140, unit: "уд/мин" },
        { name: "6 сен", value: 70, unit: "уд/мин" },
        { name: "7 сен", value: 100, unit: "уд/мин" },
    ]

    const min = data.reduce((min, item) => item.value < min ? item.value : min, data[0].value);
    const max = data.reduce((max, item) => item.value > max ? item.value : max, data[0].value);
    const sum = data.reduce((sum, item) => sum + item.value, 0);
    const average = sum / data.length;
    
  return (
    <div className={cn("bg-green-100 rounded-xl w-72 h-auto", className)}>
      <div className="flex items-center justify-center gap-2 mx-3 mt-5">
        <div className={`flex items-center justify-center rounded-xl p-2 bg-white`}>
          <div className={`text-${iconColor}`}>{icon}</div>
        </div>
        <div className="text-lg text-black">{title}</div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center justify-start">
          <div className="text-3xl font-semibold ml-6">{value}</div>
          <div className="text-lg text-black font-semibold opacity-60 ml-2 mt-1">{unit}</div>
        </div>
        <div className="text-md font-semibold mx-6 mt-3 text-center cursor-pointer">
            <Plus size={20} />
        </div>
      </div>
      <div className="text-md font-semibold ml-6 mt-3 w-16 text-center bg-white rounded-xl">
        Норма
      </div>
      <div className="flex items-center justify-center mt-6">
        <DashboardIndicatorChart color={'#FF907E'} data={data} />
      </div>
      <div className="flex items-center justify-between my-2 mx-4">
        <div className="text-md font-semibold">
            Мин: {min}
        </div>
        <div className="text-md font-semibold">
            Сред: {average}
        </div>
        <div className="text-md font-semibold">
            Макс: {max}
        </div>
      </div>
    </div>
  );
};
