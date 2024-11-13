"use client";

import { IndicatorsTable } from "./indicators-table";
import { IndicatorsChart } from "./indicators-chart";
import { HeartIcon } from "lucide-react";
import { useParams } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";
import { IndicatorChartData } from "../types/indicators-types";
import { DashboardApi } from "@/features/dashboard/api/dashboard-api";
export const Indicators = () => {
  const { id } = useParams();
  const [data, setData] = useState<IndicatorChartData[] | undefined>(undefined);

  const getTitleData = (title: string) => {
    switch (title) {
        case "health":
            return "Частота сердцебиения";
        case "sleep":
            return "Часы сна";
        case "temperature":
            return "Температура тела";
        case "steps":
            return "Шагов за день";
        default:
            return title;
    }
}

  useEffect(() => {
    DashboardApi.getAll().then(response => {
      // @ts-expect-error Api issue
      setData(response[getTitleData(id as string)]);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 m-6">
      <IndicatorsChart className="w-full h-full" icon={<HeartIcon />} title={getTitleData(id as string)} data={data}/>
      <IndicatorsTable className="w-full h-full" data={data}/>
    </div>
  );
};