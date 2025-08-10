import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { DataTable } from '../common/DataTable';
import { MedicalRecordForm } from './MedicalRecordForm';
import { PatientService } from '../../services/patientService';
import { MedicalRecordService } from '../../services/medicalRecordService';
import type { Patient, MedicalRecord } from '../../types';

export function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMedicalRecordModal, setShowMedicalRecordModal] = useState(false);
  const [editingMedicalRecord, setEditingMedicalRecord] = useState<MedicalRecord | null>(null);
  const [deletingMedicalRecord, setDeletingMedicalRecord] = useState<MedicalRecord | null>(null);

  useEffect(() => {
    if (id) {
      loadPatient(parseInt(id));
      loadMedicalRecords(parseInt(id));
    }
  }, [id]);

  const loadPatient = async (patientId: number) => {
    try {
      const data = await PatientService.getPatientById(patientId);
      setPatient(data);
    } catch (err) {
      setError('Failed to load patient');
      console.error('Error loading patient:', err);
    }
  };

  const loadMedicalRecords = async (patientId: number) => {
    try {
      const data = await MedicalRecordService.getMedicalRecordsByPatientId(patientId);
      setMedicalRecords(data);
    } catch (err) {
      console.error('Error loading medical records:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedicalRecord = () => {
    setEditingMedicalRecord(null);
    setShowMedicalRecordModal(true);
  };

  const handleEditMedicalRecord = (medicalRecord: MedicalRecord) => {
    setEditingMedicalRecord(medicalRecord);
    setShowMedicalRecordModal(true);
  };

  const handleDeleteMedicalRecord = (medicalRecord: MedicalRecord) => {
    setDeletingMedicalRecord(medicalRecord);
  };

  const confirmDeleteMedicalRecord = async () => {
    if (!deletingMedicalRecord || !id) return;

    try {
      await MedicalRecordService.deleteMedicalRecord(deletingMedicalRecord.recordId);
      await loadMedicalRecords(parseInt(id));
      setDeletingMedicalRecord(null);
    } catch (err) {
      setError('Failed to delete medical record');
      console.error('Error deleting medical record:', err);
    }
  };

  const handleSaveMedicalRecord = async (medicalRecordData: Omit<MedicalRecord, 'recordId' | 'createdAt' | 'updatedAt' | 'patientId' | 'patientName'>) => {
    if (!id) return;

    try {
      if (editingMedicalRecord) {
        await MedicalRecordService.updateMedicalRecord(editingMedicalRecord.recordId, medicalRecordData);
      } else {
        await MedicalRecordService.createMedicalRecord({
          ...medicalRecordData,
          patientId: parseInt(id),
          patientName: patient ? patient.firstName + ' ' + patient.lastName : '',
        });
      }
      await loadMedicalRecords(parseInt(id));
      setShowMedicalRecordModal(false);
      setEditingMedicalRecord(null);
    } catch (err) {
      setError('Failed to save medical record');
      console.error('Error saving medical record:', err);
    }
  };

  const medicalRecordColumns = [
    { key: 'visitDate' as keyof MedicalRecord, header: 'Visit Date' },
    { key: 'diagnosis' as keyof MedicalRecord, header: 'Diagnosis' },
    { key: 'treatment' as keyof MedicalRecord, header: 'Treatment' },
    { key: 'prescription' as keyof MedicalRecord, header: 'Prescription' },
    { key: 'doctorName' as keyof MedicalRecord, header: 'Doctor' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading patient...</div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-8">
        <div className="text-lg text-gray-600 mb-4">Patient not found</div>
        <Button onClick={() => navigate('/patients')} variant="primary">
          Back to Patients
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button onClick={() => navigate('/patients')} variant="secondary" className="mb-2">
            ← Back to Patients
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">
            {patient.firstName} {patient.lastName}
          </h2>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Patient Information */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <p className="text-gray-900">{patient.dateOfBirth}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="text-gray-900">{patient.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <p className="text-gray-900">{patient.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
            <p className="text-gray-900">{patient.emergencyContactName || 'Not specified'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Emergency Phone</label>
            <p className="text-gray-900">{patient.emergencyContactPhone || 'Not specified'}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <p className="text-gray-900">{patient.address || 'Not specified'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <p className="text-gray-900">{patient.gender || 'Not specified'}</p>
          </div>
        </div>
      </div>

      {/* Medical Records Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Medical Records</h3>
          <Button onClick={handleAddMedicalRecord} variant="primary">
            Add Medical Record
          </Button>
        </div>

        <DataTable
          data={medicalRecords}
          columns={medicalRecordColumns}
          onEdit={handleEditMedicalRecord}
          onDelete={handleDeleteMedicalRecord}
          showActions={true}
        />
      </div>

      {/* Add/Edit Medical Record Modal */}
      <Modal
        isOpen={showMedicalRecordModal}
        onClose={() => {
          setShowMedicalRecordModal(false);
          setEditingMedicalRecord(null);
        }}
        title={editingMedicalRecord ? 'Edit Medical Record' : 'Add Medical Record'}
        size="lg"
      >
        <MedicalRecordForm
          medicalRecord={editingMedicalRecord}
          onSave={handleSaveMedicalRecord}
          onCancel={() => {
            setShowMedicalRecordModal(false);
            setEditingMedicalRecord(null);
          }}
        />
      </Modal>

      {/* Delete Medical Record Confirmation Modal */}
      <Modal
        isOpen={!!deletingMedicalRecord}
        onClose={() => setDeletingMedicalRecord(null)}
        title="Confirm Delete"
        size="sm"
      >
        <div className="p-4">
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete this medical record? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setDeletingMedicalRecord(null)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDeleteMedicalRecord}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 