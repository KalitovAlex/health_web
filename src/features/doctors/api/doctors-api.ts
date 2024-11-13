import { apiRequest } from "@/shared/api";
import type { DoctorsListResponse, DoctorsSearchParams } from "../types";

export const DoctorsApi = {
  getAll: async (params?: DoctorsSearchParams) => {
    const response = await apiRequest.post<DoctorsListResponse[]>(
      "/doctor/all",
      params
    );
    return response.data;
  },
}; 