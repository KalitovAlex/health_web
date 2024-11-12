import { z } from "zod";

export const createAuthSchema = () =>
  z.object({
    email: z.string().email("Некорректный email"),
    password: z
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .max(20, "Пароль не должен превышать 20 символов"),
  });

export type AuthFormData = z.infer<ReturnType<typeof createAuthSchema>>;

export interface AuthState {
  isLoading: boolean;
  error: Error | null;
  login: (credentials: AuthFormData) => Promise<void>;
  register: (data: AuthFormData) => Promise<void>;
}
