import type {
  RecommendationsResponse,
} from "../types";
import { apiRequest } from "@/shared/api";

export const RecommendationsApi = {

  get: async () => {
    try {
      const response = await apiRequest.get<RecommendationsResponse>("/analytics");
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        return undefined;
      }
      throw error;
    }
  },
};