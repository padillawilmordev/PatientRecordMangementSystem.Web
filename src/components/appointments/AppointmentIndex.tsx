import React, { useState, useEffect } from 'react';
import { DataTable } from '../common/DataTable';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { AppointmentForm } from './AppointmentForm';
import { AppointmentService } from '../../services/appointmentService';
import type { Appointment } from '../../types';

export function AppointmentIndex() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [deletingAppointment, setDeletingAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await AppointmentService.getAllAppointments();
      setAppointments(data);
      setError(null);
    } catch (err) {
      setError('Failed to load appointments');
      console.error('Error loading appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAppointment = () => {
    setEditingAppointment(null);
    setShowModal(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setShowModal(true);
  };

  const handleDeleteAppointment = (appointment: Appointment) => {
    setDeletingAppointment(appointment);
  };

  const confirmDelete = async () => {
    if (!deletingAppointment) return;

    try {
      await AppointmentService.deleteAppointment(deletingAppointment.appointmentId);
      await loadAppointments();
      setDeletingAppointment(null);
    } catch (err) {
      setError('Failed to delete appointment');
      console.error('Error deleting appointment:', err);
    }
  };

  const handleSaveAppointment = async (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingAppointment) {
        await AppointmentService.updateAppointment(editingAppointment.appointmentId, appointmentData);
      } else {
        await AppointmentService.createAppointment(appointmentData);
      }
      await loadAppointments();
      setShowModal(false);
      setEditingAppointment(null);
    } catch (err) {
      setError('Failed to save appointment');
      console.error('Error saving appointment:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      Scheduled: 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
      NoShow: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const columns = [
    { key: 'patientName' as keyof Appointment, header: 'Patient Name' },
    { 
      key: 'appointmentDate' as keyof Appointment, 
      header: 'Date',
      render: (value: any) => formatDate(value)
    },
    { 
      key: 'appointmentTime' as keyof Appointment, 
      header: 'Time',
      render: (value: any) => formatTime(value)
    },
    { key: 'duration' as keyof Appointment, header: 'Duration (min)' },
    { key: 'reason' as keyof Appointment, header: 'Reason' },
    { 
      key: 'status' as keyof Appointment, 
      header: 'Status',
      render: (value: any) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(value)}`}>
          {value}
        </span>
      )
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading appointments...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        <Button onClick={handleAddAppointment} variant="primary">
          Add Appointment
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <DataTable
        data={appointments}
        columns={columns}
        onEdit={handleEditAppointment}
        onDelete={handleDeleteAppointment}
      />

      {/* Add/Edit Appointment Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingAppointment(null);
        }}
        title={editingAppointment ? 'Edit Appointment' : 'Add Appointment'}
        size="lg"
      >
        <AppointmentForm
          appointment={editingAppointment}
          onSave={handleSaveAppointment}
          onCancel={() => {
            setShowModal(false);
            setEditingAppointment(null);
          }}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingAppointment}
        onClose={() => setDeletingAppointment(null)}
        title="Confirm Delete"
        size="sm"
      >
        <div className="p-4">
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete the appointment for{' '}
            <strong>{deletingAppointment?.patientName}</strong> on{' '}
            <strong>{deletingAppointment?.scheduledDate}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setDeletingAppointment(null)}
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