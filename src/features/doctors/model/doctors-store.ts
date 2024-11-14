import { create } from "zustand";
import type { DoctorsState, ReviewData } from "../types";
import { DoctorsApi } from "../api/doctors-api";
import { apiRequest } from "@/shared/api";

export const useDoctorsStore = create<DoctorsState>((set, get) => ({
  doctors: [],
  isLoading: false,
  error: null,
  searchParams: {
    firstName: "",
    lastName: "",
  },

  setSearchParams: (params) =>
    set({ searchParams: { ...get().searchParams, ...params } }),

  fetchDoctors: async () => {
    try {
      set({ isLoading: true, error: null });
      const { searchParams } = get();
      const doctors = await DoctorsApi.getAll(searchParams);
      set({ doctors, error: null });
    } catch (error) {
      set({ doctors: [], error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),

  addReview: async (doctorId: string, review: ReviewData) => {
    try {
      const response = await apiRequest.post(
        `/doctors/${doctorId}/reviews`,
        review
      );
      const updatedDoctor = response.data;
      set((state) => ({
        doctors: state.doctors.map((doc) =>
          doc.uuid === doctorId ? updatedDoctor : doc
        ),
      }));
      return response.data;
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  },
}));
