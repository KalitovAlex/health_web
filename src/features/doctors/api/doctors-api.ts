import { apiRequest } from "@/shared/api";
import type {
  DoctorRequest,
  DoctorsListResponse,
  DoctorsSearchParams,
  SendDoctorRequestResponse,
} from "../types";

interface CreateFeedbackRequest {
  rating: number;
  content: string;
  doctorUuid: string;
}

export interface Feedback {
  uuid: string;
  rating: number;
  content: string;
  createdAt: string;
  doctorUuid: string;
  userUuid: string;
  user: {
    uuid: string;
    email: string;
    firstName: string;
    lastName: string;
    contactInfo: string | null;
    createdAt: string;
    description: string | null;
    isDoctor: boolean;
    doctorUuid: string | null;
    userUuid: string | null;
  };
  doctor: {
    uuid: string;
    email: string;
  };
}

export const DoctorsApi = {
  getAll: async (params?: DoctorsSearchParams) => {
    const response = await apiRequest.post<DoctorsListResponse[]>(
      "/doctor/all",
      params
    );
    return response.data;
  },

  sendRequest: async (doctorUuid: string) => {
    const response = await apiRequest.post<SendDoctorRequestResponse>(
      "/doctor/send-request",
      { doctorUuid }
    );
    return response.data;
  },

  getPatients: async () => {
    const response = await apiRequest.get<DoctorsListResponse[]>(
      "/doctor/patients"
    );
    return response.data;
  },

  getRequests: async () => {
    const response = await apiRequest.get<DoctorRequest[]>("/doctor/requests");
    return response.data;
  },

  approveRequest: async (requestUuid: string) => {
    const response = await apiRequest.post('/doctor/approve-request', {
      requestUuid
    });
    return response.data;
  },

  rejectRequest: async (requestId: string) => {
    const response = await apiRequest.post(`/doctor/requests/${requestId}/reject`);
    return response.data;
  },

  disconnectPatient: async (patientUuid: string) => {
    const response = await apiRequest.post('/doctor/disconnect', {
      patientUuid
    });
    return response.data;
  },

  getFeedback: async (doctorUuid: string) => {
    const response = await apiRequest.get<Feedback[]>(`/feedback/${doctorUuid}`);
    return response.data;
  },

  createFeedback: async (data: CreateFeedbackRequest) => {
    const response = await apiRequest.post<Feedback>('/feedback', data);
    return response.data;
  },
};
