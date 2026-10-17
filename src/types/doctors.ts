export type {
  CreateDoctorInput,
  UpdateDoctorInput,
} from '@/app/validation/validation';

export interface DoctorDB {
  id: string;
  phoneNumber: string | null;
  specialization: string | null;
  bio: string | null;
  isAvailable: boolean | null;
  createdAt: Date;
  updatedAt: Date;

  userId: string;
  departmentId: string;
}
export type DoctorUI = Omit<DoctorDB, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string | null;
};
