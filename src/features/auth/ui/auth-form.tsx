"use client";

import { AuthFormData, createAuthSchema } from "../types";
import { Button, App } from "antd";
import { useAuth } from "../model/use-auth";
import { InputTypes } from "@/shared/enums/input";
import { Form } from "@/shared/ui/form/form";
import { useState } from "react";

export function AuthForm() {
  const { login } = useAuth();
  const { message } = App.useApp();
  const [isLoading, setIsLoading] = useState(false);

  const authSchema = createAuthSchema();

  const fields = [
    {
      name: "email",
      label: "Email",
      type: InputTypes.TEXT,
      required: true,
    },
    {
      name: "password",
      label: "Пароль",
      type: InputTypes.PASSWORD,
      required: true,
    },
  ];

  const handleSubmit = async (data: AuthFormData) => {
    try {
      setIsLoading(true);
      await login(data);
      message.success("Успешная авторизация");
    } catch (error: unknown) {
      console.error("Auth error:", error);
      message.error(
        error instanceof Error
          ? error.message
          : "Ошибка при авторизации. Пожалуйста, попробуйте снова."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form<AuthFormData>
        fields={fields}
        schema={authSchema}
        onSubmit={handleSubmit}
      >
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-md"
          loading={isLoading}
          block
        >
          {isLoading ? "Вход..." : "Войти"}
        </Button>
      </Form>
    </div>
  );
}
