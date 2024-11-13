import { formatDate } from "@/shared/utils/format-date";
import { DoctorsListResponse } from "../types";
import { Card, Typography } from "antd";
import { Mail, Phone, Calendar, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { DoctorModal } from "./doctor-modal";

const { Title, Text } = Typography;

interface DoctorCardProps {
  doctor: DoctorsListResponse;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="h-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Card
          hoverable
          className="w-full h-full transition-all duration-200 hover:shadow-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm rounded-2xl shadow-sm"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {doctor.firstName[0]}
                  {doctor.lastName[0]}
                </span>
              </div>

              <div className="flex-1">
                <Title level={4} className="!mb-0 !font-bold text-gray-800">
                  {doctor.firstName} {doctor.lastName}
                </Title>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Star
                        key={rating}
                        className={`w-4 h-4 ${
                          rating <= doctor.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200 fill-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({doctor.reviewsCount} отзывов)
                  </span>
                </div>
              </div>
            </div>

            <div className="py-4 border-b border-gray-100">
              <Text className="text-gray-600 block leading-relaxed text-center">
                {doctor.description || "Описание отсутствует"}
              </Text>
            </div>

            <div className="pt-4 space-y-3">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 group bg-gradient-to-br from-gray-50 to-transparent p-3 rounded-xl border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 text-center">
                  <Text type="secondary" className="text-sm block">
                    Email:
                  </Text>
                  <Text className="text-gray-700 font-medium">
                    {doctor.email}
                  </Text>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 group bg-gradient-to-br from-gray-50 to-transparent p-3 rounded-xl border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 text-center">
                  <Text type="secondary" className="text-sm block">
                    Контакты:
                  </Text>
                  <Text className="text-gray-700 font-medium">
                    {doctor.contactInfo || "Не указан"}
                  </Text>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 group bg-gradient-to-br from-gray-50 to-transparent p-3 rounded-xl border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 text-center">
                  <Text type="secondary" className="text-sm block">
                    Дата регистрации:
                  </Text>
                  <Text className="text-gray-700 font-medium">
                    {formatDate(doctor.createdAt)}
                  </Text>
                </div>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>

      <DoctorModal
        doctor={doctor}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
