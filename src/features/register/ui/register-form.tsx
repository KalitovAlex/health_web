"use client";

import { InputTypes } from "@/shared/enums/input";
import { useRegister } from "../model/use-register";
import { Button, App } from "antd";
import { Form } from "@/shared/ui/form/form";
import { createRegisterSchema } from "../types";
import { RegisterFormData } from "../types";

export function RegisterForm() {
  const { register } = useRegister();
  const { message } = App.useApp();

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
    {
      name: "confirmPassword",
      label: "Подтвердите пароль",
      type: InputTypes.PASSWORD,
      required: true,
    },
  ];

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
      message.success("Успешная регистрация");
    } catch (error: unknown) {
      console.error(error);
      message.error("Ошибка при регистрации");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-[28px] font-bold text-gray-900">Регистрация</h1>
        <p className="text-[15px] text-gray-600">Создайте свой аккаунт</p>
      </div>

      <Form<RegisterFormData>
        fields={fields}
        schema={createRegisterSchema()}
        onSubmit={handleSubmit}
      >
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-md mt-2"
          block
        >
          Зарегистрироваться
        </Button>
      </Form>
    </div>
  );
}
