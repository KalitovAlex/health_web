"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DoctorsApi } from "../api/doctors-api";
import { PatientInfo } from "../types";
import { Card, Input, Select, Empty, Spin, message } from "antd";
import { Search, Calendar, Activity, User2 } from "lucide-react";
import { formatDate } from "@/shared/utils/format-date";

const { Search: AntSearch } = Input;

export const DoctorPatientsList = () => {
  const [patients, setPatients] = useState<PatientInfo[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<PatientInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await DoctorsApi.getPatients();
      setPatients(data);
      setFilteredPatients(data);
    } catch (error) {
      message.error("Не удалось загрузить список пациентов");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const filtered = patients.filter((patient) => {
      const matchesSearch =
        `${patient.firstName} ${patient.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
    setFilteredPatients(filtered);
  }, [searchQuery, statusFilter, patients]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl shadow-sm">
        <AntSearch
          placeholder="Поиск по имени или email"
          allowClear
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        <Select
          defaultValue="all"
          onChange={setStatusFilter}
          className="min-w-[200px]"
          options={[
            { value: "all", label: "Все пациенты" },
            { value: "ACTIVE", label: "Активные" },
            { value: "INACTIVE", label: "Неактивные" },
          ]}
        />
      </div>

      {filteredPatients.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPatients.map((patient, index) => (
            <motion.div
              key={patient.uuid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                hoverable
                className="h-full transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User2 className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{patient.email}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          patient.status === "ACTIVE"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {patient.status === "ACTIVE"
                          ? "Активный"
                          : "Неактивный"}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Последний визит:{" "}
                          {patient.lastVisit
                            ? formatDate(patient.lastVisit)
                            : "Нет данных"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Activity className="w-4 h-4" />
                        <span>
                          Диагноз: {patient.diagnosis || "Не указан"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Empty
          description="Пациенты не найдены"
          className="my-12"
        />
      )}
    </motion.div>
  );
}; 