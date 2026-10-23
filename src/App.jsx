import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EmployeeProvider } from './context/EmployeeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import EmployeeForm from './pages/EmployeeForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <EmployeeProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Route Content */}
          <main className="main-content">
            <Routes>
              {/* Home Page / Employee Dashboard (Both are identical) */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/dashboard" element={<Navigate to="/" replace />} />

              {/* Employee Form */}
              <Route path="/employee-form" element={<EmployeeForm />} />

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </EmployeeProvider>
  );
}

export default App;
