import { z } from "zod";

export const createRegisterSchema = () => {
  return z
    .object({
      email: z.string().email("Некорректный email"),
      password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
      confirmPassword: z
        .string()
        .min(6, "Пароль должен содержать минимум 6 символов"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Пароли не совпадают",
      path: ["confirmPassword"], // показывает ошибку в поле confirmPassword
    });
};
