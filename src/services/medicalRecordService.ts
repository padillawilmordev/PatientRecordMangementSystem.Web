import type { MedicalRecord, ApiResponse } from '../types';
import { API_BASE_URL, API_ENDPOINTS, DEFAULT_HEADERS } from '../config/api';

export class MedicalRecordService {
  static async getMedicalRecordsByPatientId(patientId: number): Promise<MedicalRecord[]> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.medicalRecords}/patient/${patientId}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<MedicalRecord[]> = await response.json();
      return result.data || [];
    } catch (error) {
      console.error(`Error fetching medical records for patient ${patientId}:`, error);
      throw error;
    }
  }

  static async getMedicalRecordById(id: number): Promise<MedicalRecord> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.medicalRecords}/${id}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<MedicalRecord> = await response.json();
      return result.data;
    } catch (error) {
      console.error(`Error fetching medical record ${id}:`, error);
      throw error;
    }
  }

  static async createMedicalRecord(medicalRecord: Omit<MedicalRecord, 'recordId' | 'createdAt' | 'updatedAt'>): Promise<MedicalRecord> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.medicalRecords}`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(medicalRecord),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<MedicalRecord> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error creating medical record:', error);
      throw error;
    }
  }

  static async updateMedicalRecord(id: number, medicalRecord: Partial<Omit<MedicalRecord, 'recordId' | 'createdAt' | 'updatedAt'>>): Promise<MedicalRecord> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.medicalRecords}/${id}`, {
        method: 'PUT',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(medicalRecord),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<MedicalRecord> = await response.json();
      return result.data;
    } catch (error) {
      console.error(`Error updating medical record ${id}:`, error);
      throw error;
    }
  }

  static async deleteMedicalRecord(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.medicalRecords}/${id}`, {
        method: 'DELETE',
        headers: DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting medical record ${id}:`, error);
      throw error;
    }
  }
} 