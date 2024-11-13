import { Rate, message, App, Modal } from "antd";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Calendar,
  Star,
  Send,
  MessageCircle,
  Info,
  Check,
} from "lucide-react";
import { DoctorsListResponse } from "../types";
import { formatDate } from "@/shared/utils/format-date";
import { useState } from "react";
import { DoctorsApi } from "../api/doctors-api";
import { useUserStore } from "@/entities/user";

interface DoctorModalProps {
  doctor: DoctorsListResponse;
  open: boolean;
  onClose: () => void;
}

export const DoctorModal = ({ doctor, open, onClose }: DoctorModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { modal } = App.useApp();
  const user = useUserStore((state) => state.user);

  const hasDoctor = user?.doctorUuid !== undefined && user?.doctorUuid !== null;

  const handleSendRequest = () => {
    modal.confirm({
      title: "Отправить приглашение",
      content: "Вы уверены, что хотите отправить приглашение этому врачу?",
      okText: "Отправить",
      cancelText: "Отмена",
      className: "confirm-modal",
      okButtonProps: {
        className: "bg-primary hover:bg-primary-hover text-white",
      },
      cancelButtonProps: {
        className:
          "border-primary text-primary hover:text-primary-hover hover:border-primary-hover",
      },
      onOk: async () => {
        try {
          setIsLoading(true);
          await DoctorsApi.sendRequest(doctor.uuid);
          message.success("Приглашение успешно отправлено");
          onClose();
        } catch (error) {
          console.log(error);
          message.error("Не удалось отправить приглашение");
        } finally {
          setIsLoading(false);
        }
      },
    });
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-4 px-6 pt-6">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <span className="text-xl md:text-2xl font-bold text-primary">
              {doctor.firstName[0]}
              {doctor.lastName[0]}
            </span>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-primary">
              {doctor.firstName} {doctor.lastName}
            </h3>
            <div className="flex items-center gap-2">
              <Rate
                disabled
                defaultValue={doctor.rating}
                character={
                  <Star className="w-4 h-4" fill="#FFB800" stroke="#FFB800" />
                }
              />
              <span className="text-sm text-gray-500">
                ({doctor.reviewsCount} отзывов)
              </span>
            </div>
          </div>
        </div>
      }
      open={open}
      onCancel={onClose}
      width="95%"
      centered
      destroyOnClose
      className="doctor-modal [&_.ant-modal-content]:p-0 [&_.ant-modal-content]:rounded-2xl [&_.ant-modal-content]:bg-gradient-to-br [&_.ant-modal-content]:from-gray-50 [&_.ant-modal-content]:to-white [&_.ant-modal-header]:border-none [&_.ant-modal-header]:bg-transparent [&_.ant-modal-close]:top-6 [&_.ant-modal-close]:right-6"
      footer={null}
      okButtonProps={{ className: "bg-primary hover:bg-primary-600" }}
      cancelButtonProps={{
        className:
          "border-primary text-primary hover:text-primary-600 hover:border-primary-600",
      }}
    >
      <div className="p-6">
        <div className="bg-white p-4 md:p-6 rounded-xl mb-4 md:mb-6 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">О враче</h4>
          <p className="text-gray-600 leading-relaxed">
            {doctor.description || "Описание пока не добавлено"}
          </p>
        </div>

        {hasDoctor ? (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg font-medium mb-6">
            <Info className="w-5 h-5" />У вас уже есть лечащий врач
          </div>
        ) : doctor.request?.isApproved ? (
          <div className="flex items-center gap-2 p-4 bg-yellow-50 text-yellow-600 rounded-lg font-medium mb-6">
            <Check className="w-5 h-5" />
            Заявка отправлена
          </div>
        ) : doctor.request?.isApproved ? (
          <div className="flex items-center gap-2 p-4 bg-green-50 text-green-600 rounded-lg font-medium mb-6">
            <Check className="w-5 h-5" />
            Заявка принята
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSendRequest}
            disabled={isLoading || hasDoctor}
            className="w-full flex items-center justify-center gap-2 p-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-colors disabled:opacity-50 mb-6"
          >
            <Send className="w-5 h-5" />
            {isLoading ? "Отправка..." : "Отправить приглашение"}
          </motion.button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-700">
                Контактная информация
              </h3>
            </div>
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 group bg-gradient-to-br from-primary/5 to-transparent p-4 rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="text-sm text-gray-500 block mb-1">
                    Электронная почта
                  </span>
                  <span className="text-gray-700 font-medium group-hover:text-primary transition-colors">
                    {doctor.email}
                  </span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 group bg-gradient-to-br from-primary/5 to-transparent p-4 rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="text-sm text-gray-500 block mb-1">
                    Контактный телефон
                  </span>
                  <span className="text-gray-700 font-medium group-hover:text-primary transition-colors">
                    {doctor.contactInfo || "Не указан"}
                  </span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 group bg-gradient-to-br from-primary/5 to-transparent p-4 rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="text-sm text-gray-500 block mb-1">
                    Дата регистрации
                  </span>
                  <span className="text-gray-700 font-medium group-hover:text-primary transition-colors">
                    {formatDate(doctor.createdAt)}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-gray-700">Отзывы</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled
                className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg font-medium flex items-center gap-2 cursor-not-allowed"
              >
                <Star className="w-4 h-4" />
                Оставить отзыв
              </motion.button>
            </div>
            <div className="text-center py-8 md:py-12 bg-gradient-to-br from-primary/5 to-transparent rounded-xl">
              <MessageCircle className="w-12 h-12 md:w-16 md:h-16 text-primary/40 mx-auto mb-4" />
              <p className="text-gray-500">Отзывы пока недоступны</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
