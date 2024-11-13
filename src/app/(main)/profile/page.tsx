"use client";

import { useUserStore } from "@/entities/user";
import { motion } from "framer-motion";
import { Mail, Phone, Calendar, Award, User2 } from "lucide-react";
import { formatDate } from "@/shared/utils/format-date";
import { Button } from "antd";

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <span className="text-3xl md:text-4xl font-bold text-primary">
              {user.firstName[0]}
              {user.lastName[0]}
            </span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-500 mt-2">{user.email}</p>
            <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.isDoctor
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {user.isDoctor ? "Врач" : "Пациент"}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600">
                Активный
              </span>
            </div>
          </div>
          <Button
            type="primary"
            className="bg-primary font-bold hover:bg-primary-hover"
          >
            Редактировать профиль
          </Button>
        </div>
      </motion.div>

      {/* Info Sections */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Основная информация
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Дата регистрации</p>
                <p className="text-gray-900">{formatDate(user.createdAt)}</p>
              </div>
            </div>

            {user.doctorUuid && !user.isDoctor && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <User2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">ID врача</p>
                  <p className="text-gray-900">{user.doctorUuid}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Doctor Specific Info */}
        {user.isDoctor && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Информация о враче
            </h2>
            <div className="space-y-4">
              {user.contactInfo && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Контактная информация
                    </p>
                    <p className="text-gray-900">{user.contactInfo}</p>
                  </div>
                </div>
              )}

              {user.description && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Описание</p>
                    <p className="text-gray-900">{user.description}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                  <User2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Количество пациентов</p>
                  <p className="text-gray-900">{user.patients?.length || 0}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
