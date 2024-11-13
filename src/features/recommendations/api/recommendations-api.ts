import type { RecommendationsResponse } from "../types";
import { apiRequest } from "@/shared/api";
import { AxiosError } from "axios";

export const RecommendationsApi = {
  get: async () => {
    try {
      const response = await apiRequest.get<RecommendationsResponse>(
        "/analytics"
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return undefined;
      }
      console.error(error);
      throw error;
    }
  },
};
