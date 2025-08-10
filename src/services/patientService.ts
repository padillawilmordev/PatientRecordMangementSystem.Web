import type { Patient, ApiResponse } from '../types';
import { API_BASE_URL, API_ENDPOINTS, DEFAULT_HEADERS } from '../config/api';

export class PatientService {
  static async getAllPatients(): Promise<Patient[]> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.patients}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Patient[]> = await response.json();
      return result || [];
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  }

  static async getPatientById(id: number): Promise<Patient> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.patients}/${id}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Patient> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error fetching patient ${id}:`, error);
      throw error;
    }
  }

  static async createPatient(patient: Omit<Patient, 'patientId' | 'createdAt' | 'updatedAt'>): Promise<Patient> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.patients}`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(patient),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Patient> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  }

  static async updatePatient(id: number, patient: Partial<Omit<Patient, 'patientId' | 'createdAt' | 'updatedAt'>>): Promise<Patient> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.patients}/${id}`, {
        method: 'PUT',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(patient),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Patient> = await response.json();
      return result.data;
    } catch (error) {
      console.error(`Error updating patient ${id}:`, error);
      throw error;
    }
  }

  static async deletePatient(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.patients}/${id}`, {
        method: 'DELETE',
        headers: DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting patient ${id}:`, error);
      throw error;
    }
  }
} 