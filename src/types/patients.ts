
export type {
  CreatePatientInput,
  UpdatePatientInput,
} from '@/app/validation/validation';




export interface PatientDB {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: Date | null;
  nationalId: string | null;
  phoneNumber: string;
  email: string | null;
  address: string | null;
  insuranceNumber: string | null;
  insuranceProvider: string | null;
  createdAt: Date;
}

// 2. الواجهة المخصصة لشاشات العرض (UI Presentation)
export interface PatientUI {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  nationalId: string;
  phoneNumber: string;
  email: string;
  address?: string | null;
  insuranceNumber?: string | null;
  insuranceProvider?: string | null;
  createdAt: Date;
}
