import { z } from "zod";

export const createRegisterSchema = (isDoctor: boolean = false) => {
  const baseSchema = {
    email: z.string().email("Некорректный email"),
    firstName: z.string().min(2, "Минимум 2 символа"),
    lastName: z.string().min(2, "Минимум 2 символа"),
    password: z.string().min(6, "Минимум 6 символов"),
    confirmPassword: z.string(),
  };

  const doctorSchema = {
    description: z.string().min(10, "Минимум 10 символов"),
    contactInfo: z.string().min(10, "Минимум 10 символов"),
  };

  const schema = isDoctor
    ? z.object({ ...baseSchema, ...doctorSchema })
    : z.object(baseSchema);

  return schema.refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });
};

export type RegisterFormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  description?: string;
  contactInfo?: string;
  isDoctor?: boolean;
};
