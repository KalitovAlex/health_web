import { create } from "zustand";
import type { UserState } from "../types";
import { userApi } from "../api";

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  
  setUser: (user) => set({ user }),
  
  fetchUser: async () => {
    try {
      set({ isLoading: true, error: null });
      const user = await userApi.getMe();
      set({ user });
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
})); 