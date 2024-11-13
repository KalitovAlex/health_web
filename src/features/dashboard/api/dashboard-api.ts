import type { CreateDashboardPayload, DashboardResponse } from "../types";
import { apiRequest } from "@/shared/api";

export const DashboardApi = {
  getAll: async () => {
    try {
      const response = await apiRequest.get<DashboardResponse[]>(
        "/medical-indicators"
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        console.log("No data");
        return undefined;
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
