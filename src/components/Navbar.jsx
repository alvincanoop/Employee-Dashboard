import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, UserPlus, Users, Menu, X, Building2 } from 'lucide-react';
import { useEmployees } from '../context/EmployeeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { employees } = useEmployees();

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  return (
    <header className="custom-navbar">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          {/* Brand Logo & Name */}
          <Link to="/" className="text-decoration-none d-flex align-items-center gap-3" onClick={closeNavbar}>
            <div className="brand-badge">
              <Users size={22} strokeWidth={2.5} />
            </div>
            <div>
              <div className="brand-title">EmployeeHub</div>
              <div className="brand-sub">MERN Directory & Portal</div>
            </div>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="btn btn-light d-md-none border p-2 rounded-3"
            type="button"
            onClick={toggleNavbar}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="d-none d-md-flex align-items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-custom-link ${isActive ? 'active' : ''}`}
            >
              <LayoutDashboard size={18} />
              <span>Home</span>
              {employees.length > 0 && (
                <span className="badge rounded-pill bg-light text-dark ms-1 small fw-bold">
                  {employees.length}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/employee-form"
              className={({ isActive }) => `nav-custom-link ${isActive ? 'active' : ''}`}
            >
              <UserPlus size={18} />
              <span>Employee Form</span>
            </NavLink>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="d-md-none mt-3 pt-3 border-top">
            <div className="d-flex flex-column gap-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) => `nav-custom-link ${isActive ? 'active' : ''}`}
                onClick={closeNavbar}
              >
                <LayoutDashboard size={18} />
                <span>Home (Dashboard)</span>
                {employees.length > 0 && (
                  <span className="badge rounded-pill bg-light text-dark ms-auto">
                    {employees.length}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/employee-form"
                className={({ isActive }) => `nav-custom-link ${isActive ? 'active' : ''}`}
                onClick={closeNavbar}
              >
                <UserPlus size={18} />
                <span>Employee Form</span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
