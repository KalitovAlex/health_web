"use client";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { DoctorsApi } from "../api/doctors-api";
import { DoctorRequest } from "../types";
import { Card, Button, Empty, Spin, Input, message } from "antd";
import { User2, CheckCircle, XCircle, Calendar } from "lucide-react";
import { formatDate } from "@/shared/utils/format-date";

const { Search: AntSearch } = Input;

export const DoctorRequestsList = () => {
  const [requests, setRequests] = useState<DoctorRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await DoctorsApi.getRequests();
      setRequests(data.filter((request) => !request.isApproved));
    } catch (error) {
      console.error("Error fetching requests:", error);
      message.error("Не удалось загрузить список заявок");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleApprove = async (requestUuid: string) => {
    try {
      setIsLoading(true);
      await DoctorsApi.approveRequest(requestUuid);
      setRequests((prev) => prev.filter((req) => req.uuid !== requestUuid));
      message.success("Заявка принята");
    } catch (error) {
      console.error("Error approving request:", error);
      message.error("Не удалось обработать заявку");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (patientUuid: string) => {
    try {
      setIsLoading(true);
      await DoctorsApi.disconnectPatient(patientUuid);
      setRequests((prev) =>
        prev.filter((req) => req.patientUuid !== patientUuid)
      );
      message.success("Заявка отклонена");
    } catch (error) {
      console.error("Error rejecting request:", error);
      message.error("Не удалось обработать заявку");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRequests = requests.filter((request) =>
    request.uuid.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {/* Поиск */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <AntSearch
          placeholder="Поиск по номеру заявки..."
          allowClear
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
          size="large"
        />
      </div>

      {/* Список заявок */}
      {filteredRequests.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.uuid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                hoverable
                className="transition-all duration-300 hover:shadow-lg border-none"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <User2 className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          №{request.uuid}
                        </h3>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Создано: {formatDate(request.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <User2 className="w-4 h-4" />
                            <span>ID врача: {request.doctorUuid}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <User2 className="w-4 h-4" />
                            <span>ID пациента: {request.patientUuid}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-4">
                      <Button
                        type="primary"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handleApprove(request.uuid)}
                        icon={<CheckCircle className="w-4 h-4" />}
                      >
                        Принять
                      </Button>
                      <Button
                        danger
                        onClick={() => handleReject(request.patientUuid)}
                        icon={<XCircle className="w-4 h-4" />}
                      >
                        Отклонить
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Empty description="Заявки не найдены" className="my-12" />
      )}
    </motion.div>
  );
};
