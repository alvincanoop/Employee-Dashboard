import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container py-5 text-center">
      <div className="py-5">
        <div className="mb-4 text-warning">
          <AlertTriangle size={64} className="mx-auto" />
        </div>
        <h1 className="display-5 fw-bold text-dark mb-2">404 - Page Not Found</h1>
        <p className="lead text-muted mb-4">
          The requested route does not exist in EmployeeHub.
        </p>
        <Link to="/" className="btn btn-primary-custom">
          <Home size={18} />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
