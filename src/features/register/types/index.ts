import { z } from "zod";

export const createRegisterSchema = () =>
  z.object({
    email: z.string().email("Неверный email"),
    password: z.string().min(6, "Пароль должен быть длиннее 6 символов"),
    phone: z.string().min(1, "Телефон обязателен"),
  });

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
