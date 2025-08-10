import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import type { MedicalRecord } from '../../types';

interface MedicalRecordFormProps {
  medicalRecord?: MedicalRecord | null;
  onSave: (medicalRecordData: Omit<MedicalRecord, 'recordId' | 'createdAt' | 'updatedAt' | 'patientId' | 'patientName'>) => void;
  onCancel: () => void;
}

export function MedicalRecordForm({ medicalRecord, onSave, onCancel }: MedicalRecordFormProps) {
  const [formData, setFormData] = useState({
    visitDate: '',
    diagnosis: '',
    treatment: '',
    prescription: '',
    followUpDate: '',
    doctorName: '',
  });

  useEffect(() => {
    if (medicalRecord) {
      setFormData({
        visitDate: medicalRecord.visitDate,
        diagnosis: medicalRecord.diagnosis || '',
        treatment: medicalRecord.treatment || '',
        prescription: medicalRecord.prescription || '',
        followUpDate: medicalRecord.followUpDate || '',
        doctorName: medicalRecord.doctorName || '',
      });
    } else {
      // Set default date to today for new records
      setFormData(prev => ({
        ...prev,
        visitDate: new Date().toISOString().split('T')[0],
      }));
    }
  }, [medicalRecord]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700 mb-1">
            Visit Date *
          </label>
          <input
            type="date"
            id="visitDate"
            name="visitDate"
            value={formData.visitDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="followUpDate" className="block text-sm font-medium text-gray-700 mb-1">
            Follow-up Date
          </label>
          <input
            type="date"
            id="followUpDate"
            name="followUpDate"
            value={formData.followUpDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700 mb-1">
          Doctor Name
        </label>
        <input
          type="text"
          id="doctorName"
          name="doctorName"
          value={formData.doctorName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-1">
          Diagnosis
        </label>
        <textarea
          id="diagnosis"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="treatment" className="block text-sm font-medium text-gray-700 mb-1">
          Treatment
        </label>
        <textarea
          id="treatment"
          name="treatment"
          value={formData.treatment}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="prescription" className="block text-sm font-medium text-gray-700 mb-1">
          Prescription
        </label>
        <textarea
          id="prescription"
          name="prescription"
          value={formData.prescription}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {medicalRecord ? 'Update Medical Record' : 'Create Medical Record'}
        </Button>
      </div>
    </form>
  );
} 