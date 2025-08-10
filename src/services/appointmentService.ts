import type { Appointment, ApiResponse } from '../types';
import { API_BASE_URL, API_ENDPOINTS, DEFAULT_HEADERS } from '../config/api';

export class AppointmentService {
  static async getAllAppointments(): Promise<Appointment[]> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.appointments}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Appointment[]> = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  }

  static async getAppointmentById(id: number): Promise<Appointment> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.appointments}/${id}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Appointment> = await response.json();
      return result.data;
    } catch (error) {
      console.error(`Error fetching appointment ${id}:`, error);
      throw error;
    }
  }

  static async createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.appointments}`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(appointment),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Appointment> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }

  static async updateAppointment(id: number, appointment: Partial<Appointment>): Promise<Appointment> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.appointments}/${id}`, {
        method: 'PUT',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(appointment),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Appointment> = await response.json();
      return result.data;
    } catch (error) {
      console.error(`Error updating appointment ${id}:`, error);
      throw error;
    }
  }

  static async deleteAppointment(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.appointments}/${id}`, {
        method: 'DELETE',
        headers: DEFAULT_HEADERS,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting appointment ${id}:`, error);
      throw error;
    }
  }
} 