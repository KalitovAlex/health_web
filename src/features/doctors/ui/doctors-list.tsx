"use client";
import { useDoctorsStore } from "../model/doctors-store";
import { DoctorCard } from "./doctor-card";
import { Form, Button, Typography } from "antd";
import { useEffect, useCallback } from "react";
import { DoctorsSearchParams } from "../types";
import { EmptyState } from "@/shared/ui/empty-state";
import { SearchField } from "@/shared/ui/search-field";
import {
  COMMON_NAMES,
  COMMON_SURNAMES,
  DOCTORS_MESSAGES,
} from "../model/constants";
import { motion } from "framer-motion";
import { Star, Search, Users2, RotateCw } from "lucide-react";
import { useUserStore } from "@/entities/user";

const { Title } = Typography;

export const DoctorsList = () => {
  const {
    doctors,
    isLoading,
    error,
    searchParams,
    setSearchParams,
    fetchDoctors,
    clearError,
  } = useDoctorsStore();
  const { user } = useUserStore();
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDoctors().catch(() => {
      // Ошибка обрабатывается в store
    });
  }, [fetchDoctors]);

  const handleSearch = useCallback(
    async (values: DoctorsSearchParams) => {
      setSearchParams(values);
      try {
        await fetchDoctors();
      } catch {
        // Ошибка обрабатывается в store
      }
    },
    [setSearchParams, fetchDoctors]
  );

  const handleReset = useCallback(() => {
    form.setFieldsValue({ firstName: "", lastName: "" });
    setSearchParams({ firstName: "", lastName: "" });
    clearError();
    fetchDoctors().catch(() => {
      // Ошибка обрабатывается в store
    });
  }, [form, setSearchParams, clearError, fetchDoctors]);

  const getNameSuggestions = useCallback(
    (searchText: string) =>
      COMMON_NAMES.filter((name) =>
        name.toLowerCase().includes(searchText?.toLowerCase() || "")
      ).map((name) => ({ value: name, label: name })),
    []
  );

  const getSurnameSuggestions = useCallback(
    (searchText: string) =>
      COMMON_SURNAMES.filter((surname) =>
        surname.toLowerCase().includes(searchText?.toLowerCase() || "")
      ).map((surname: string) => ({ value: surname, label: surname })),
    []
  );

  if (error) {
    return (
      <EmptyState
        icon={<Users2 className="w-8 h-8 text-gray-400" />}
        title={DOCTORS_MESSAGES.ERROR.TITLE}
        description={DOCTORS_MESSAGES.ERROR.DESCRIPTION}
        actionButton={{
          label: DOCTORS_MESSAGES.ERROR.RETRY,
          onClick: handleReset,
          icon: <RotateCw className="w-4 h-4" />,
        }}
      />
    );
  }

  if (user?.doctor) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
            <h3 className="text-lg font-bold text-primary mb-4">
              Ваш лечащий врач
            </h3>
            <DoctorCard doctor={user.doctor} isMyDoctor={true} />
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Title
            level={2}
            className="!mb-2 !font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent"
          >
            Найдите своего врача
            <Star className="w-6 h-6 text-yellow-400 ml-2 inline-block fill-yellow-400" />
          </Title>
          <p className="text-gray-600 text-lg">
            Используйте поиск для подбора специалиста
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
        <Form
          form={form}
          onFinish={handleSearch}
          layout="vertical"
          initialValues={searchParams}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="firstName"
              label={
                <span className="font-bold flex items-center gap-1">
                  {DOCTORS_MESSAGES.FORM.FIRST_NAME}
                  <Star className="w-3 h-3 text-red-500 fill-red-500" />
                </span>
              }
              className="mb-0"
            >
              <SearchField
                placeholder={DOCTORS_MESSAGES.FORM.PLACEHOLDER.FIRST_NAME}
                onSearch={(value) => form.setFieldValue("firstName", value)}
                suggestions={getNameSuggestions(
                  form.getFieldValue("firstName") || ""
                )}
                loading={isLoading}
                value={form.getFieldValue("firstName")}
                onChange={(value) => form.setFieldValue("firstName", value)}
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              label={
                <span className="font-bold flex items-center gap-1">
                  {DOCTORS_MESSAGES.FORM.LAST_NAME}
                  <Star className="w-3 h-3 text-red-500 fill-red-500" />
                </span>
              }
              className="mb-0"
            >
              <SearchField
                placeholder={DOCTORS_MESSAGES.FORM.PLACEHOLDER.LAST_NAME}
                onSearch={(value) => form.setFieldValue("lastName", value)}
                suggestions={getSurnameSuggestions(
                  form.getFieldValue("lastName") || ""
                )}
                loading={isLoading}
                value={form.getFieldValue("lastName")}
                onChange={(value) => form.setFieldValue("lastName", value)}
              />
            </Form.Item>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              icon={<RotateCw className="w-4 h-4 text-primary" />}
              onClick={handleReset}
              className="hover:text-primary transition-colors hover:border-primary font-bold"
              size="large"
            >
              {DOCTORS_MESSAGES.FORM.RESET}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              icon={<Search className="w-4 h-4" />}
              className="min-w-[120px] bg-primary hover:bg-primary/90 text-white font-bold"
              size="large"
            >
              {DOCTORS_MESSAGES.FORM.SEARCH}
            </Button>
          </div>
        </Form>
      </motion.div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[400px] gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
          />
          <p className="text-primary animate-pulse font-bold text-lg">
            {DOCTORS_MESSAGES.LOADING}
          </p>
        </div>
      ) : doctors.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-[1400px] mx-auto"
        >
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.uuid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <DoctorCard doctor={doctor} isMyDoctor={false} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState
          icon={<Search className="w-8 h-8 text-gray-400" />}
          title={DOCTORS_MESSAGES.EMPTY.TITLE}
          description={DOCTORS_MESSAGES.EMPTY.DESCRIPTION}
          actionButton={{
            label: DOCTORS_MESSAGES.EMPTY.RESET,
            onClick: handleReset,
            icon: <RotateCw className="w-4 h-4" />,
          }}
        />
      )}
    </motion.div>
  );
};
