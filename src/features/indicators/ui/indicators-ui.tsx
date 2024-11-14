"use client";

import { IndicatorsTable } from "./indicators-table";
import { IndicatorsChart } from "./indicators-chart";
import { HeartIcon } from "lucide-react";
import { useParams } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";
import { IndicatorChartData } from "../types/indicators-types";
import { DashboardApi } from "@/features/dashboard/api/dashboard-api";
import { motion } from "framer-motion";

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
  };

  useEffect(() => {
    DashboardApi.getAll().then((response) => {
      // @ts-expect-error Api issue
      setData(response[getTitleData(id as string)]);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 m-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
      >
        <h1 className="text-xl md:text-2xl font-semibold text-[var(--foreground)]">
          {getTitleData(id as string)}
        </h1>
        <p className="text-sm text-[var(--foreground)]/60">
          Детальная статистика и история изменений
        </p>
      </motion.div>

      <IndicatorsChart
        className="w-full"
        icon={<HeartIcon />}
        title={getTitleData(id as string)}
        // @ts-expect-error - API возвращает объект с динамическими ключами
        data={data}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <IndicatorsTable className="w-full" data={data} />
      </motion.div>
    </div>
  );
};
