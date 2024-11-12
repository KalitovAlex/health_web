import type {
  CreateDashboardPayload,
  DashboardResponse,
} from "../types";
import { apiRequest } from "@/shared/api";

export const DashboardApi = {

  getAll: async () => {
    const response = await apiRequest.get<DashboardResponse[]>("/medical-indicators");
    return response.data;
  },

  create: async (data: CreateDashboardPayload) => {
    const response = await apiRequest.post<DashboardResponse>("/medical-indicators", data, {
      headers: {
        "Authorization": "",
      },
    });
    return response.data;
  },
};