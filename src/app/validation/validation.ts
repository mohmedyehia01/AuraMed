import { z } from 'zod';

export const CreatePatientSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: 'Phone number is required' })
    .max(15, { message: 'Phone number is too long' }),
  userId: z.string().min(1, { message: 'user ID is required' }),
  dateOfBirth: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.coerce.date().optional()
  ),
  nationalId: z.string().optional(),
  address: z.string().optional(),
  insuranceNumber: z.string().optional(),
  insuranceProvider: z.string().optional(),
});

export const UpdatePatientSchema = CreatePatientSchema.partial();

export const CreateDoctorSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: 'Phone number is required' })
    .max(15, { message: 'phone number is too long' }),
  specialization: z
    .string()
    .trim()
    .min(1, { message: 'Specialization is required' })
    .max(100, { message: 'this field is too long' }),
  bio: z.string().optional(),
  isAvailable: z.boolean().optional(),
  userId: z.string().min(1, { message: 'user id is required' }),
  departmentId: z.preprocess(
    (v) => (v === '' ? undefined : v),
    z.string().optional()
  ),
});
export const UpdateDoctorSchema = CreateDoctorSchema.omit({ userId: true }).partial();
export type CreatePatientInput = z.infer<typeof CreatePatientSchema>;
export type UpdatePatientInput = z.infer<typeof UpdatePatientSchema>;
export type CreateDoctorInput = z.infer<typeof CreateDoctorSchema>;
export type UpdateDoctorInput = z.infer<typeof UpdateDoctorSchema>;
