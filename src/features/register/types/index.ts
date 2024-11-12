import { z } from "zod";

export const createRegisterSchema = (isDoctor: boolean = false) =>
  z.object({
    email: z.string().email("Неверный email"),
    password: z.string().min(6, "Пароль должен быть длиннее 6 символов"),
    phone: z.string().min(1, "Телефон обязателен"),
    ...(isDoctor && {
      description: z.string().min(10, "Минимум 10 символов"),
      contactInfo: z.string().min(10, "Минимум 10 символов"),
    }),
  });

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
