"use client";

import { cn } from "@/shared/utils/lib/cn";
import { DashboardIndicator } from "./dashboard-indicator";
import { Footprints, Heart, Moon, Thermometer } from "lucide-react";
import IndicatorAddModal from "./modal/indicator-add-modal";
import { useState, useCallback, useEffect } from "react";
import { DashboardApi } from "../api";
import type { DashboardResponse } from "../types";
import { DoctorsApi } from "@/features/doctors/api/doctors-api";
import { IndicatorInstructions } from "./modal/indicator-instructions";

interface DashboardIndicatorsProps {
  className?: string;
  patientUuid?: string;
}

export const DashboardIndicators = ({
  className,
  patientUuid,
}: DashboardIndicatorsProps) => {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalIcon, setModalIcon] = useState<React.ReactNode>(<Heart />);
  const [modalUnit, setModalUnit] = useState("уд/мин");
  const [data, setData] = useState<DashboardResponse[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = patientUuid
          ? await DoctorsApi.getPatient(patientUuid)
          : await DashboardApi.getAll();
        setData(response as DashboardResponse[]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [patientUuid]);

  const handleAdd = useCallback(
    (title: string, icon: React.ReactNode, unit: string) => {
      setOpen(true);
      setModalTitle(title);
      setModalIcon(icon);
      setModalUnit(unit);
    },
    []
  );

  const refreshData = useCallback(() => {
    DashboardApi.getAll().then((response) => {
      setData(response);
    });
  }, []);

  // If patientUuid exists, we're in the patient dashboard view
  const isPatientDashboard = Boolean(patientUuid);

  return data ? (
    <div className={cn("w-full mt-10 md:mt-0", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardIndicator
          icon={<Heart />}
          footer={true}
          iconColor="red"
          title="Частота сердцебиения"
          // @ts-expect-error - API возвращает объект с динамическими ключами
          data={data ? data?.["Частота сердцебиения"] : undefined}
          onAdd={() => handleAdd("Частота сердцебиения", <Heart />, "уд/мин")}
          hideAddButton={isPatientDashboard}
        />
        <DashboardIndicator
          icon={<Thermometer />}
          footer={true}
          iconColor="red"
          title="Температура тела"
          // @ts-expect-error - API возвращает объект с динамическими ключами
          data={data ? data?.["Температура тела"] : undefined}
          onAdd={() => handleAdd("Температура тела", <Thermometer />, "°C")}
          hideAddButton={isPatientDashboard}
        />
        <DashboardIndicator
          icon={<Moon />}
          footer={true}
          iconColor="blue"
          title="Часы сна"
          // @ts-expect-error - API возвращает объект с динамическими ключами
          data={data ? data?.["Часы сна"] : undefined}
          onAdd={() => handleAdd("Часы сна", <Moon />, "ч")}
          hideAddButton={isPatientDashboard}
          className="md:h-[calc(56vh-8rem)]"
        />
        <DashboardIndicator
          icon={<Footprints />}
          footer={true}
          iconColor="red"
          title="Шагов за день"
          // @ts-expect-error - API возвращает объект с динамическими ключами
          data={data ? data?.["Шагов за день"] : undefined}
          onAdd={() => handleAdd("Шагов за день", <Footprints />, "шагов")}
          hideAddButton={isPatientDashboard}
          className="md:h-[calc(56vh-8rem)]"
        />
      </div>
      <IndicatorAddModal
        open={open}
        onClose={() => setOpen(false)}
        title={modalTitle}
        icon={modalIcon}
        unit={modalUnit}
        refreshData={refreshData}
        instructions={<IndicatorInstructions id={modalTitle} />}
      />
    </div>
  ) : null;
};
