interface Doctor {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  contactInfo?: string;
  createdAt: string;
  description?: string;
  feedbacks?: Array<{
    uuid: string;
    rating: number;
    content: string;
    createdAt: string;
    user: {
      uuid: string;
      firstName: string;
      lastName: string;
    };
  }>;
}

interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  isDoctor: boolean;
  doctorUuid?: string;
  doctor?: Doctor;
} 