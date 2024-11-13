"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DoctorsApi } from "../api/doctors-api";
import { DoctorRequest } from "../types";
import { Card, Button, Empty, Spin, message, Tabs } from "antd";
import { User2, CheckCircle, XCircle, Clock } from "lucide-react";
import { formatDate } from "@/shared/utils/format-date";

const { TabPane } = Tabs;

export const DoctorRequestsList = () => {
  const [requests, setRequests] = useState<DoctorRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "PENDING" | "ACCEPTED" | "REJECTED"
  >("PENDING");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await DoctorsApi.getRequests();
      setRequests(data);
    } catch {
      message.error("Не удалось загрузить список заявок");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (requestId: string) => {
    try {
      await DoctorsApi.approveRequest(requestId);
      message.success("Заявка принята");
      await fetchRequests();
    } catch {
      message.error("Не удалось обработать заявку");
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await DoctorsApi.rejectRequest(requestId);
      message.success("Заявка отклонена");
      await fetchRequests();
    } catch {
      message.error("Не удалось обработать заявку");
    }
  };

  const filteredRequests = requests.filter((request) => {
    return request.status === activeTab;
  });

  const statusConfig = {
    PENDING: {
      icon: <Clock className="w-5 h-5 text-yellow-500" />,
      text: "Ожидает рассмотрения",
      color: "bg-yellow-100 text-yellow-600",
    },
    ACCEPTED: {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      text: "Принято",
      color: "bg-green-100 text-green-600",
    },
    REJECTED: {
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      text: "Отклонено",
      color: "bg-red-100 text-red-600",
    },
  } as const;

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
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as typeof activeTab)}
        className="bg-white p-4 rounded-xl shadow-sm"
      >
        <TabPane
          tab={
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Новые заявки
            </span>
          }
          key="PENDING"
        />
        <TabPane
          tab={
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Принятые
            </span>
          }
          key="ACCEPTED"
        />
        <TabPane
          tab={
            <span className="flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Отклоненные
            </span>
          }
          key="REJECTED"
        />
      </Tabs>

      {filteredRequests.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.doctorUuid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="transition-all duration-300 hover:shadow-lg">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <User2 className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Заявка №{request.doctorUuid.slice(0, 8)}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatDate(request.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            statusConfig[request.status].color
                          }`}
                        >
                          {statusConfig[request.status].text}
                        </span>
                      </div>
                    </div>

                    {request.status === "PENDING" && (
                      <div className="mt-4 flex gap-4">
                        <Button
                          type="primary"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleApprove(request.doctorUuid)}
                          icon={<CheckCircle className="w-4 h-4" />}
                        >
                          Принять
                        </Button>
                        <Button
                          danger
                          onClick={() => handleReject(request.doctorUuid)}
                          icon={<XCircle className="w-4 h-4" />}
                        >
                          Отклонить
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Empty
          description={`Заявки ${statusConfig[
            activeTab
          ].text.toLowerCase()} отсутствуют`}
          className="my-12"
        />
      )}
    </motion.div>
  );
};
