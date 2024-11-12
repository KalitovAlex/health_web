import { apiRequest } from "@/shared/api";
import type { User } from "../types";

export const userApi = {
  getMe: async () => {
    const response = await apiRequest.get<User>("/users/me");
    return response.data;
  },
}; 