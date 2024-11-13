"use client";
import { useDoctorsStore } from "../model/doctors-store";
import { DoctorCard } from "./doctor-card";
import { Form, Button, Typography } from "antd";
import { useEffect, useCallback } from "react";
import { DoctorsSearchParams } from "../types";
import {
  SearchOutlined,
  ReloadOutlined,
  TeamOutlined,
  StarFilled,
} from "@ant-design/icons";
import { EmptyState } from "@/shared/ui/empty-state";
import { SearchField } from "@/shared/ui/search-field";
import {
  COMMON_NAMES,
  COMMON_SURNAMES,
  DOCTORS_MESSAGES,
} from "../model/constants";

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
      ).map((surname) => ({ value: surname, label: surname })),
    []
  );

  if (error) {
    return (
      <EmptyState
        icon={<TeamOutlined className="text-2xl text-gray-400" />}
        title={DOCTORS_MESSAGES.ERROR.TITLE}
        description={DOCTORS_MESSAGES.ERROR.DESCRIPTION}
        actionButton={{
          label: DOCTORS_MESSAGES.ERROR.RETRY,
          onClick: handleReset,
          icon: <ReloadOutlined />,
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Title level={2} className="!mb-2 !font-bold">
          Найдите своего врача
          <StarFilled className="text-yellow-400 ml-2 text-xl" />
        </Title>
        <p className="text-gray-600 text-lg">
          Используйте поиск для подбора специалиста
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
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
                  <StarFilled className="text-red-500 text-xs" />
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
                  <StarFilled className="text-red-500 text-xs" />
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
              icon={<ReloadOutlined className="text-primary" />}
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
              icon={<SearchOutlined className="text-white" />}
              className="min-w-[120px] bg-primary hover:bg-primary/90 text-white font-bold"
              size="large"
            >
              {DOCTORS_MESSAGES.FORM.SEARCH}
            </Button>
          </div>
        </Form>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[400px] gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 animate-pulse font-bold text-lg">
            {DOCTORS_MESSAGES.LOADING}
          </p>
        </div>
      ) : doctors.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.uuid} doctor={doctor} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<SearchOutlined className="text-2xl text-gray-400" />}
          title={DOCTORS_MESSAGES.EMPTY.TITLE}
          description={DOCTORS_MESSAGES.EMPTY.DESCRIPTION}
          actionButton={{
            label: DOCTORS_MESSAGES.EMPTY.RESET,
            onClick: handleReset,
            icon: <ReloadOutlined />,
          }}
        />
      )}
    </div>
  );
};
