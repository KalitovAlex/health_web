import { AxiosError } from "axios";
import type { CreateDashboardPayload, DashboardResponse } from "../types";
import { apiRequest } from "@/shared/api";

export const DashboardApi = {
  getAll: async () => {
    try {
      const response = await apiRequest.get<DashboardResponse[]>(
        "/medical-indicators"
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return {
          asd: [],
        } as unknown as DashboardResponse[];
      }
      throw error;
    }
  },

  create: async (data: CreateDashboardPayload) => {
    const response = await apiRequest.post<DashboardResponse>(
      "/medical-indicators",
      data
    );
    return response.data;
  },
};
