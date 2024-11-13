import { User } from "@/entities/user";

export interface DoctorRequest {
  doctorUuid: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
}

export interface DoctorsListResponse extends User {
  rating: number;
  reviewsCount: number;
  request?: DoctorRequest;
}

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

export interface SendDoctorRequestResponse {
  success: boolean;
  request: DoctorRequest;
}

export interface PatientInfo extends User {
  lastVisit?: string;
  nextVisit?: string;
  diagnosis?: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface DoctorRequestInfo extends DoctorRequest {
  patient: {
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  message?: string;
}
