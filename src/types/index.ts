export interface Patient {
  patientId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Appointment {
  appointmentId: number;
  patientId: number;
  doctorId?: number;
  scheduledDate: string;
  status: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  doctorName?: string;
  patientName: string;
}

export interface MedicalRecord {
  recordId: number;
  patientId: number;
  doctorId?: number;
  visitDate: string;
  diagnosis?: string;
  treatment?: string;
  prescription?: string;
  followUpDate?: string;
  createdAt?: string;
  updatedAt?: string;
  doctorName?: string;
  patientName: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
} 