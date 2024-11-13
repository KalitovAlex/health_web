import { create } from "zustand";
import type { DoctorsState } from "../types";
import { DoctorsApi } from "../api/doctors-api";

export const useDoctorsStore = create<DoctorsState>((set, get) => ({
  doctors: [],
  isLoading: false,
  error: null,
  searchParams: {
    firstName: "",
    lastName: "",
  },

  setSearchParams: (params) => set({ searchParams: { ...get().searchParams, ...params } }),

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
})); 