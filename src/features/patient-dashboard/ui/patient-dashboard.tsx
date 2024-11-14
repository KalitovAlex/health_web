"use client";

import { DashboardIndicators } from "@/features/dashboard/ui/dashboard-ui";
import { useEffect, useState } from "react";
import { DoctorsApi } from "@/features/doctors/api/doctors-api";
import { PatientInfo } from "@/features/doctors/types";
import { Skeleton, Card } from "antd";
import { motion } from "framer-motion";
import { User2, Mail, Calendar, Stethoscope } from "lucide-react";
import { formatDate } from "@/shared/utils/format-date";

interface PatientDashboardProps {
  patientUuid: string;
}

export const PatientDashboard = ({ patientUuid }: PatientDashboardProps) => {
  const [patient, setPatient] = useState<PatientInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patients = await DoctorsApi.getPatients();
        const currentPatient = patients.find((p) => p.uuid === patientUuid);
        setPatient(currentPatient || null);
      } catch (error) {
        console.error("Error fetching patient:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatient();
  }, [patientUuid]);

  if (isLoading) {
    return <Skeleton active />;
  }

  if (!patient) {
    return <div>Пациент не найден</div>;
  }

  return (
    <div className="space-y-6">
      {/* Основная информация */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <User2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-gray-500">{patient.email}</p>
          </div>
          <div className="ml-auto">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                patient.status === "ACTIVE"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {patient.status === "ACTIVE" ? "Активный" : "Неактивный"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Детальная информация */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="w-full">
          <h2 className="text-lg font-semibold mb-6">Информация о пациенте</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{patient.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Дата регистрации</p>
                <p className="text-gray-900">{formatDate(patient.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Последний визит</p>
                <p className="text-gray-900">
                  {patient.lastVisit
                    ? formatDate(patient.lastVisit)
                    : "Нет данных"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                <User2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">ID пациента</p>
                <p className="text-gray-900">{patient.uuid}</p>
              </div>
            </div>

            {patient.doctorUuid && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                  <User2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">ID врача</p>
                  <p className="text-gray-900">{patient.doctorUuid}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Медицинские показатели */}
      <DashboardIndicators patientUuid={patientUuid} />
    </div>
  );
};
