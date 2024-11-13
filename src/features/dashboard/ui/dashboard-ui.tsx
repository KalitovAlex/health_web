"use client";

import { cn } from "@/shared/utils/lib/cn";
import type { DashboardProps } from "../types";
import { DashboardIndicator } from "./dashboard-indicator";
import { Droplet, Footprints, Heart, Thermometer } from "lucide-react";
import IndicatorAddModal from "./modal/indicator-add-modal";
import { useState, useCallback } from "react";

export const DashboardIndicators = ({ className }: DashboardProps) => {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalIcon, setModalIcon] = useState<React.ReactNode>(<Heart />);
  const [modalUnit, setModalUnit] = useState("уд/мин");

  const handleAdd = useCallback((title: string, icon: React.ReactNode, unit: string) => {
    setOpen(true);
    setModalTitle(title);
    setModalIcon(icon);
    setModalUnit(unit);
  }, []);

  return (
    <div className={cn("", className)}>
      <div className="flex items-center justify-center w-full my-8 flex-wrap gap-5">
        <DashboardIndicator 
          icon={<Heart />} 
          footer={true} 
          iconColor="red" 
          title="Частота сердцебиения" 
          data={[{name: "12:00", value: 65, unit: "уд/мин"}, {name: "13:00", value: 80, unit: "уд/мин"}]} 
          onAdd={() => handleAdd("Частота сердцебиения", <Heart />, "уд/мин")} 
        />
        <DashboardIndicator icon={<Thermometer />} footer={true} iconColor="red" title="Температура тела" data={[{name: "12:00", value: 36.6, unit: "°C"}, {name: "13:00", value: 40.5, unit: "°C"}]} onAdd={() => handleAdd("Температура тела", <Thermometer />, "°C")} />
        <DashboardIndicator icon={<Droplet />} footer={false} iconColor="red" title="Давление" data={[{name: "12:00", value: 120, unit: "мм рт.ст."}, {name: "13:00", value: 120, unit: "мм рт.ст."}]} onAdd={() => handleAdd("Давление", <Droplet />, "мм рт.ст.")} />
        <DashboardIndicator icon={<Footprints />} footer={true} iconColor="red" title="Шагов за день" data={[{name: "Вчера", value: 4321, unit: "шагов"}, {name: "Сегодня", value: 1234, unit: "шагов"}]} onAdd={() => handleAdd("Шагов за день", <Footprints />, "шагов")} />
      </div>
      <IndicatorAddModal 
        open={open} 
        onClose={() => setOpen(false)} 
        title={modalTitle} 
        icon={modalIcon} 
        unit={modalUnit} 
      />
    </div>
  );
};
