import { z } from "zod";

export const createRegisterSchema = (isDoctor: boolean = false) =>
  z.object({
    email: z.string().email("Неверный email"),
    firstName: z.string().min(2, "Минимум 2 символа"),
    lastName: z.string().min(2, "Минимум 2 символа"),
    password: z.string().min(6, "Пароль должен быть длиннее 6 символов"),
    isDoctor: z.boolean().optional(),
    ...(isDoctor && {
      description: z.string().min(10, "Минимум 10 символов"),
      contactInfo: z.string().min(10, "Минимум 10 символов"),
    }),
  });

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
