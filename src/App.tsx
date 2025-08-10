import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { PatientIndex } from './components/patients/PatientIndex';
import { PatientDetail } from './components/patients/PatientDetail';
import { AppointmentIndex } from './components/appointments/AppointmentIndex';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/patients" replace />} />
          <Route path="/patients" element={<PatientIndex />} />
          <Route path="/patients/:id" element={<PatientDetail />} />
          <Route path="/appointments" element={<AppointmentIndex />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
