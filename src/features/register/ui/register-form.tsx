"use client";

import { InputTypes } from "@/shared/enums/input";
import { useRegister } from "../model/use-register";
import { Button, App, Switch } from "antd";
import { Form } from "@/shared/ui/form/form";
import { createRegisterSchema } from "../types";
import { RegisterFormData } from "../types";
import { useState } from "react";

export function RegisterForm() {
  const { register } = useRegister();
  const { message } = App.useApp();
  const [isDoctor, setIsDoctor] = useState(false);

  const baseFields = [
    {
      name: "email",
      label: "Email",
      type: InputTypes.TEXT,
      required: true,
    },
    {
      name: "firstName",
      label: "Имя",
      type: InputTypes.TEXT,
      required: true,
    },
    {
      name: "lastName",
      label: "Фамилия",
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

  const doctorFields = [
    {
      name: "description",
      label: "Описание",
      type: InputTypes.TEXTAREA,
      required: isDoctor,
    },
    {
      name: "contactInfo",
      label: "Контактная информация",
      type: InputTypes.TEXTAREA,
      required: isDoctor,
    },
  ];

  const fields = isDoctor ? [...baseFields, ...doctorFields] : baseFields;

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      await register({ ...data, isDoctor });
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

      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-gray-600">Пациент</span>
        <Switch
          checked={isDoctor}
          onChange={setIsDoctor}
          className={isDoctor ? "bg-primary" : ""}
        />
        <span className="text-gray-600">Врач</span>
      </div>

      <Form<RegisterFormData>
        fields={fields}
        schema={createRegisterSchema(isDoctor)}
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
