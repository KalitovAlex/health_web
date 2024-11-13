import { User } from "@/entities/user";

export interface DoctorsListResponse extends User {}

export interface DoctorsSearchParams {
  firstName?: string;
  lastName?: string;
}

export interface DoctorsState {
  doctors: DoctorsListResponse[];
  isLoading: boolean;
  error: Error | null;
  searchParams: DoctorsSearchParams;
  setSearchParams: (params: DoctorsSearchParams) => void;
  fetchDoctors: () => Promise<void>;
  clearError: () => void;
} 