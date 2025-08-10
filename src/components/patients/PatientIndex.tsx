import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../common/DataTable';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { PatientForm } from './PatientForm';
import { PatientService } from '../../services/patientService';
import type { Patient } from '../../types';

export function PatientIndex() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const data = await PatientService.getAllPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError('Failed to load patients');
      console.error('Error loading patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = () => {
    setEditingPatient(null);
    setShowModal(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setShowModal(true);
  };

  const handleViewPatient = (patient: Patient) => {
    navigate(`/patients/${patient.patientId}`);
  };

  const handleDeletePatient = (patient: Patient) => {
    setDeletingPatient(patient);
  };

  const confirmDelete = async () => {
    if (!deletingPatient) return;

    try {
      await PatientService.deletePatient(deletingPatient.patientId);
      await loadPatients();
      setDeletingPatient(null);
    } catch (err) {
      setError('Failed to delete patient');
      console.error('Error deleting patient:', err);
    }
  };

  const handleSavePatient = async (patientData: Omit<Patient, 'patientId' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingPatient) {
        await PatientService.updatePatient(editingPatient.patientId, patientData);
      } else {
        await PatientService.createPatient(patientData);
      }
      await loadPatients();
      setShowModal(false);
      setEditingPatient(null);
    } catch (err) {
      setError('Failed to save patient');
      console.error('Error saving patient:', err);
    }
  };

  const columns = [
    { key: 'firstName' as keyof Patient, header: 'First Name' },
    { key: 'lastName' as keyof Patient, header: 'Last Name' },
    { key: 'dateOfBirth' as keyof Patient, header: 'Date of Birth' },
    { key: 'email' as keyof Patient, header: 'Email' },
    { key: 'phone' as keyof Patient, header: 'Phone' },
    { key: 'gender' as keyof Patient, header: 'Gender' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading patients...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Patients</h2>
        <Button onClick={handleAddPatient} variant="primary">
          Add Patient
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <DataTable
        data={patients}
        columns={columns}
        onView={handleViewPatient}
        onEdit={handleEditPatient}
        onDelete={handleDeletePatient}
      />

      {/* Add/Edit Patient Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingPatient(null);
        }}
        title={editingPatient ? 'Edit Patient' : 'Add Patient'}
        size="lg"
      >
        <PatientForm
          patient={editingPatient}
          onSave={handleSavePatient}
          onCancel={() => {
            setShowModal(false);
            setEditingPatient(null);
          }}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingPatient}
        onClose={() => setDeletingPatient(null)}
        title="Confirm Delete"
        size="sm"
      >
        <div className="p-4">
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete patient{' '}
            <strong>{deletingPatient?.firstName} {deletingPatient?.lastName}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setDeletingPatient(null)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 