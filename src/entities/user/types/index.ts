export interface User {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  isDoctor: boolean;
  description: string | null;
  contactInfo: string | null;
  doctorUuid: string | null;
  userUuid: string | null;
  createdAt: string;
  doctor: null;
  patients: [];
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
}
