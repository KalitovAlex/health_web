import { cn } from "@/shared/utils/lib/cn";
import type { DashboardIndicatorProps } from "../types";
import { DashboardIndicatorChart } from "./dashboard-indicator-chart";
import { Plus } from "lucide-react";
import { AVERAGE_VALUE, MAX_VALUE, MIN_VALUE, NORMAL_VALUE } from "../model";

export const DashboardIndicator = ({
  className,
  icon,
  iconColor,
  title,
  value,
  unit,
  data,
}: DashboardIndicatorProps) => {
  const min = data.reduce(
    (min, item) => (item.value < min ? item.value : min),
    data[0].value
  );
  const max = data.reduce(
    (max, item) => (item.value > max ? item.value : max),
    data[0].value
  );
  const sum = data.reduce((sum, item) => sum + item.value, 0);
  const average = sum / data.length;

  return (
    <div className={cn("bg-green-100 rounded-xl w-72 h-auto", className)}>
      <div className="flex items-center justify-center gap-2 mx-3 mt-5">
        <div
          className={`flex items-center justify-center rounded-xl p-2 bg-white`}
        >
          <div className={`text-${iconColor}`}>{icon}</div>
        </div>
        <div className="text-lg text-black">{title}</div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center justify-start">
          <div className="text-3xl font-semibold ml-6">{value}</div>
          <div className="text-lg text-black font-semibold opacity-60 ml-2 mt-1">
            {unit}
          </div>
        </div>
        <div className="text-md font-semibold mx-6 mt-3 text-center cursor-pointer">
          <Plus size={20} />
        </div>
      </div>
      <div className="text-md font-semibold ml-6 mt-3 w-16 text-center bg-white rounded-xl">
        {NORMAL_VALUE}
      </div>
      <div className="flex items-center justify-center mt-6">
        <DashboardIndicatorChart color={"#FF907E"} data={data} />
      </div>
      <div className="flex items-center justify-between my-2 mx-4">
        <div className="text-md font-semibold">
          {MIN_VALUE} {min}
        </div>
        <div className="text-md font-semibold">
          {AVERAGE_VALUE} {average}
        </div>
        <div className="text-md font-semibold">
          {MAX_VALUE} {max}
        </div>
      </div>
    </div>
  );
};
