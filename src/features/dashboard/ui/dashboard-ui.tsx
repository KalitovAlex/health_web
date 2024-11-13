"use client";

import { cn } from "@/shared/utils/lib/cn";
import type { DashboardProps } from "../types";
import { DashboardIndicator } from "./dashboard-indicator";
import { Droplet, Footprints, Heart, Thermometer } from "lucide-react";
import IndicatorAddModal from "./modal/indicator-add-modal";
import { useState, useCallback, useEffect } from "react";
import { DashboardApi } from "../api";
import type { DashboardResponse } from "../types";
export const DashboardIndicators = ({ className }: DashboardProps) => {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalIcon, setModalIcon] = useState<React.ReactNode>(<Heart />);
  const [modalUnit, setModalUnit] = useState("уд/мин");
  const [data, setData] = useState<DashboardResponse[]>();

  useEffect(() => {
    DashboardApi.getAll().then((response) => {
      setData(response);
    });
  }, []);

  const handleAdd = useCallback((title: string, icon: React.ReactNode, unit: string) => {
    setOpen(true);
    setModalTitle(title);
    setModalIcon(icon);
    setModalUnit(unit);
  }, []);

  const refreshData = useCallback(() => {
    DashboardApi.getAll().then((response) => {
      setData(response);
    });
  }, []);

  return (data) ? (
    <div className={cn("", className)}>
      <div className="flex items-center justify-center w-full my-8 flex-wrap gap-5">
        <DashboardIndicator 
          icon={<Heart />} 
          footer={true} 
          iconColor="red" 
          title="Частота сердцебиения"
          // @ts-expect-error - API возвращает объект с динамическими ключами
          data={data ? data?.["Частота сердцебиения"] : undefined} 
          onAdd={() => handleAdd("Частота сердцебиения", <Heart />, "уд/мин")}
        />
        <DashboardIndicator 
          icon={<Thermometer />} 
          footer={true} 
          iconColor="red" 
          title="Температура тела"
          // @ts-expect-error - API возвращает объект с динамическими ключами
          data={data ? data?.["Температура тела"] : undefined} 
          onAdd={() => handleAdd("Температура тела", <Thermometer />, "°C")} 
        />
        <DashboardIndicator 
          icon={<Droplet />} 
          footer={false} 
          iconColor="red" 
          title="Давление"
          // @ts-expect-error - API возвращает объект с динамическими ключами
          data={data ? data?.["Давление"] : undefined}
          onAdd={() => handleAdd("Давление", <Droplet />, "мм рт.ст.")} 
        />
        <DashboardIndicator 
          icon={<Footprints />} 
          footer={true} 
          iconColor="red" 
          title="Шагов за день"
          // @ts-expect-error - API возвращает объект с динамическими ключами
          data={data ? data?.["Шагов за день"] : undefined} 
          onAdd={() => handleAdd("Шагов за день", <Footprints />, "шагов")} 
        />
      </div>
      <IndicatorAddModal 
        open={open} 
        onClose={() => setOpen(false)} 
        title={modalTitle} 
        icon={modalIcon} 
        unit={modalUnit}
        refreshData={refreshData}
      />
    </div>
  ) : null;
};
