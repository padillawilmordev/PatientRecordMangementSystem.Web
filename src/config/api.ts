export const API_BASE_URL = 'https://localhost:7081/api'; // Update this to match your .NET API URL

export const API_ENDPOINTS = {
  patients: '/patients',
  appointments: '/appointments',
  medicalRecords: '/medicalrecords',
} as const;

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}; 