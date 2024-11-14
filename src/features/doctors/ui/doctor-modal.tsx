import { Rate, message, App, Modal, Form, Input, Button } from "antd";
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
import { useState, useEffect } from "react";
import { DoctorsApi, Feedback } from "../api/doctors-api";
import { useUserStore } from "@/entities/user";
import { Rating } from "./rating";

interface DoctorModalProps {
  doctor: DoctorsListResponse;
  open: boolean;
  onClose: () => void;
}

export const DoctorModal = ({ doctor, open, onClose }: DoctorModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const { modal } = App.useApp();
  const user = useUserStore((state) => state.user);
  const [form] = Form.useForm();

  const hasDoctor = user?.doctorUuid !== undefined && user?.doctorUuid !== null;
  const isMyDoctor = user?.doctorUuid === doctor.uuid;

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

  const fetchFeedbacks = async () => {
    try {
      setFeedbackLoading(true);
      const data = await DoctorsApi.getFeedback(doctor.uuid);
      setFeedbacks(data);
    } catch (error) {
      console.error(error);
      message.error("Не удалось загрузить отзывы");
    } finally {
      setFeedbackLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchFeedbacks();
    }
  }, [open, doctor.uuid]);

  const handleCreateFeedback = async (values: {
    rating: number;
    content: string;
  }) => {
    try {
      setIsLoading(true);
      await DoctorsApi.createFeedback({
        ...values,
        doctorUuid: doctor.uuid,
      });

      setFeedbackModalOpen(false);

      form.resetFields();

      message.success("Отзыв успешно отправлен");

      await fetchFeedbacks();
    } catch (error) {
      console.error(error);
      message.error("Не удалось отправить отзыв");
    } finally {
      setIsLoading(false);
    }
  };

  const ratingDescriptions = [
    "Очень плохо - Не рекомендую",
    "Плохо - Есть существенные недостатки",
    "Нормально - Есть и плюсы, и минусы",
    "Хорошо - Рекомендую",
    "Отлично - Настоятельно рекомендую!",
  ];

  const renderFeedbackModal = () => (
    <Modal
      title={
        <div className="text-center pt-6">
          <h3 className="text-2xl font-bold text-gray-800">Оставить отзыв</h3>
          <p className="text-gray-500 text-sm mt-2">
            Поделитесь своим опытом с другими пациентами
          </p>
        </div>
      }
      open={feedbackModalOpen}
      onCancel={() => setFeedbackModalOpen(false)}
      footer={null}
      className="feedback-modal [&_.ant-modal-content]:rounded-2xl"
      width={500}
      centered
    >
      <Form
        form={form}
        onFinish={handleCreateFeedback}
        layout="vertical"
        className="space-y-6 pt-8"
      >
        <div className="text-center space-y-4">
          <h4 className="text-lg font-medium text-gray-700">
            Как вы оцениваете работу врача?
          </h4>
          <Form.Item
            name="rating"
            rules={[
              { required: true, message: "Пожалуйста, поставьте оценку" },
            ]}
          >
            <Rate
              character={({ index = 0, value = 0 }) => (
                <div className="relative inline-block transition-all duration-200">
                  <Star
                    className={`w-10 h-10 transition-all duration-200 ${
                      index + 1 <= value
                        ? "fill-yellow-400 text-yellow-400 scale-110"
                        : "fill-gray-200 text-gray-200 scale-100"
                    } hover:scale-110`}
                  />
                  {index + 1 <= value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                    </motion.div>
                  )}
                </div>
              )}
              className="!text-2xl [&_.ant-rate-star]:mx-1"
            />
          </Form.Item>
          <div className="text-sm text-gray-500">
            {form.getFieldValue("rating")
              ? ratingDescriptions[form.getFieldValue("rating") - 1]
              : "Выберите оценку"}
          </div>
        </div>

        <Form.Item
          name="content"
          rules={[
            { required: true, message: "Пожалуйста, напишите отзыв" },
            { min: 10, message: "Отзыв должен содержать минимум 10 символов" },
          ]}
        >
          <Input.TextArea
            placeholder="Расскажите подробнее о вашем опыте..."
            rows={4}
            className="resize-none rounded-xl !text-base"
            showCount
            maxLength={500}
          />
        </Form.Item>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            onClick={() => setFeedbackModalOpen(false)}
            className="px-6 hover:bg-gray-50"
          >
            Отмена
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="px-6 bg-primary hover:bg-primary-hover flex items-center gap-2"
            icon={<Send className="w-4 h-4" />}
          >
            Отправить отзыв
          </Button>
        </div>
      </Form>
    </Modal>
  );

  const hasUserReview = feedbacks.some(
    (feedback) => feedback.userUuid === user?.uuid
  );

  const reviewsSection = (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Отзывы ({feedbacks.length})
            </h3>
            {feedbacks.length > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <Rating
                  value={
                    feedbacks.reduce((acc, f) => acc + f.rating, 0) /
                    feedbacks.length
                  }
                />
                <span className="text-sm text-gray-500">
                  {(
                    feedbacks.reduce((acc, f) => acc + f.rating, 0) /
                    feedbacks.length
                  ).toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setFeedbackModalOpen(true)}
          disabled={!user || user.isDoctor || hasDoctor || hasUserReview}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover transition-all duration-200"
        >
          <Star className="w-4 h-4" />
          {hasUserReview ? "Вы уже оставили отзыв" : "Оставить отзыв"}
        </motion.button>
      </div>

      {feedbackLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : feedbacks.length > 0 ? (
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <motion.div
              key={feedback.uuid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-transparent"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {feedback.user.firstName[0]}
                      {feedback.user.lastName[0]}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {feedback.user.firstName} {feedback.user.lastName}
                  </span>
                </div>
                <Rating value={feedback.rating} />
              </div>
              <p className="text-gray-600 ml-10">{feedback.content}</p>
              <div className="mt-2 ml-10 text-sm text-gray-500">
                {formatDate(feedback.createdAt)}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 md:py-12 bg-gradient-to-br from-primary/5 to-transparent rounded-xl">
          <MessageCircle className="w-12 h-12 md:w-16 md:h-16 text-primary/40 mx-auto mb-4" />
          <p className="text-gray-500">Отзывов пока нет</p>
        </div>
      )}
    </div>
  );

  return (
    <>
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
                <Rating
                  value={
                    feedbacks.length > 0
                      ? feedbacks.reduce((acc, f) => acc + f.rating, 0) /
                        feedbacks.length
                      : 0
                  }
                />
                <span className="text-sm text-gray-500">
                  ({feedbacks.length} отзывов)
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
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              О враче
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {doctor.description || "Описание пока не добавлено"}
            </p>
          </div>

          {isMyDoctor ? (
            <div className="flex items-center gap-2 p-4 bg-primary/5 text-primary rounded-lg font-medium mb-6">
              <Info className="w-5 h-5" />
              Это ваш лечащий врач
            </div>
          ) : hasDoctor ? (
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
              whileHover={!hasDoctor ? { scale: 1.02 } : undefined}
              whileTap={!hasDoctor ? { scale: 0.98 } : undefined}
              onClick={handleSendRequest}
              disabled={isLoading || hasDoctor || isMyDoctor}
              className={`w-full flex items-center justify-center gap-2 p-4 rounded-lg font-bold transition-colors disabled:opacity-50 mb-6 ${
                hasDoctor || isMyDoctor
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary-hover"
              }`}
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

            {reviewsSection}
          </div>
        </div>
      </Modal>
      {renderFeedbackModal()}
    </>
  );
};
