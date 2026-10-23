import React from 'react';
import { Heart, Building } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="container">
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2">
          <div className="d-flex align-items-center gap-2">
            <Building size={16} className="text-primary" />
            <span className="fw-semibold text-dark">EmployeeHub Portal</span>
            <span>&bull; ICT MERN Stack Project</span>
          </div>
          <div className="small text-muted">
            Data synchronized from{' '}
            <a
              href="https://jsonplaceholder.typicode.com/users"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-primary"
            >
              JSONPlaceholder Users API
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
