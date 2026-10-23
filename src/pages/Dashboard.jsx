import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Search, 
  LayoutGrid, 
  Table as TableIcon, 
  Mail, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  RefreshCw, 
  AlertCircle,
  ExternalLink,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useEmployees } from '../context/EmployeeContext';

const Dashboard = () => {
  const { employees, loading, error, fetchEmployees } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  // Filter employees based on search input
  const filteredEmployees = employees.filter((emp) => {
    const term = searchTerm.toLowerCase();
    const idMatch = emp.id.toString().includes(term);
    const nameMatch = emp.name.toLowerCase().includes(term);
    const emailMatch = emp.email.toLowerCase().includes(term);
    return idMatch || nameMatch || emailMatch;
  });

  const apiCount = employees.filter(e => !e.isCustom).length;
  const customCount = employees.filter(e => e.isCustom).length;

  return (
    <div className="container">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h1 className="h3 mb-0 text-dark">Employee Dashboard</h1>
            <span className="badge badge-soft-primary d-none d-sm-inline-flex align-items-center gap-1">
              <Sparkles size={13} /> Live System
            </span>
          </div>
          <p className="text-muted mb-0">
            Welcome to the centralized workforce directory. View and manage registered employee records.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            onClick={fetchEmployees}
            disabled={loading}
            className="btn btn-outline-secondary d-flex align-items-center gap-2 px-3 py-2 rounded-3"
            title="Refresh records from JSONPlaceholder API"
          >
            <RefreshCw size={16} className={loading ? 'spinner-border spinner-border-sm' : ''} />
            <span className="d-none d-sm-inline">Sync API</span>
          </button>

          <Link to="/employee-form" className="btn btn-primary-custom">
            <UserPlus size={18} />
            <span>Add Employee</span>
          </Link>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <Users size={24} />
            </div>
            <div>
              <div className="metric-value">{employees.length}</div>
              <div className="metric-label">Total Employees</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#ecfdf5', color: '#059669' }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div className="metric-value">{apiCount}</div>
              <div className="metric-label">Fetched From API</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="metric-card">
            <div className="metric-icon-box" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
              <UserPlus size={24} />
            </div>
            <div>
              <div className="metric-value">{customCount}</div>
              <div className="metric-label">Form Submissions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Data Container */}
      <div className="dashboard-card mb-4">
        {/* Controls Bar: Search & View Switcher */}
        <div className="dashboard-card-header">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search by ID, Name, or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="small text-muted fw-semibold d-none d-md-block">
              Showing {filteredEmployees.length} of {employees.length} records
            </div>

            <div className="btn-group p-1 bg-light rounded-3 border" role="group" aria-label="View toggle">
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
              >
                <TableIcon size={16} />
                <span className="d-none d-sm-inline">Table View</span>
              </button>
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
                onClick={() => setViewMode('card')}
              >
                <LayoutGrid size={16} />
                <span className="d-none d-sm-inline">Card View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content States */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="fw-bold text-dark">Fetching Employee Directory...</h5>
            <p className="text-muted small">Accessing records from https://jsonplaceholder.typicode.com/users</p>
          </div>
        )}

        {error && !loading && (
          <div className="p-4 text-center">
            <div className="alert alert-danger d-inline-flex align-items-center gap-2 text-start p-3 rounded-4 shadow-sm">
              <AlertCircle size={24} className="text-danger flex-shrink-0" />
              <div>
                <strong className="d-block">Error loading employee data</strong>
                <span>{error}</span>
              </div>
              <button onClick={fetchEmployees} className="btn btn-sm btn-danger ms-3">
                Try Again
              </button>
            </div>
          </div>
        )}

        {!loading && !error && filteredEmployees.length === 0 && (
          <div className="text-center py-5">
            <div className="text-muted mb-3">
              <Users size={48} strokeWidth={1.5} />
            </div>
            <h5 className="fw-bold text-dark">No Employees Found</h5>
            <p className="text-muted small mb-3">
              {searchTerm ? `No matching employee records for "${searchTerm}".` : 'No employee records are available.'}
            </p>
            {searchTerm && (
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setSearchTerm('')}>
                Clear Search Filter
              </button>
            )}
          </div>
        )}

        {/* VIEW 1: TABULAR VIEW (Fields: id, name, email + details) */}
        {!loading && !error && filteredEmployees.length > 0 && viewMode === 'table' && (
          <div className="table-responsive">
            <table className="table table-custom table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '80px' }}>ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Location</th>
                  <th scope="col">Salary</th>
                  <th scope="col" className="text-end">Source</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    {/* Field 1: ID */}
                    <td>
                      <span className="id-pill">#{emp.id}</span>
                    </td>

                    {/* Field 2: Name */}
                    <td>
                      <div className="employee-avatar-wrapper">
                        <div className="employee-avatar">
                          {emp.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{emp.name}</div>
                          <div className="text-muted small">{emp.company}</div>
                        </div>
                      </div>
                    </td>

                    {/* Field 3: Email */}
                    <td>
                      <a
                        href={`mailto:${emp.email}`}
                        className="text-decoration-none text-primary d-inline-flex align-items-center gap-1 fw-medium"
                      >
                        <Mail size={15} className="text-muted" />
                        <span>{emp.email}</span>
                      </a>
                    </td>

                    {/* Additional contextual field: Designation */}
                    <td>
                      <span className="d-inline-flex align-items-center gap-1 text-secondary">
                        <Briefcase size={14} className="text-muted" />
                        <span>{emp.designation}</span>
                      </span>
                    </td>

                    {/* Additional contextual field: Location */}
                    <td>
                      <span className="d-inline-flex align-items-center gap-1 text-secondary">
                        <MapPin size={14} className="text-muted" />
                        <span>{emp.location}</span>
                      </span>
                    </td>

                    {/* Additional contextual field: Salary */}
                    <td>
                      <span className="fw-semibold text-dark">
                        ${Number(emp.salary).toLocaleString()}
                      </span>
                    </td>

                    {/* Source tag */}
                    <td className="text-end">
                      {emp.isCustom ? (
                        <span className="badge badge-soft-success">Form Input</span>
                      ) : (
                        <span className="badge badge-soft-primary">API Synced</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* VIEW 2: CARD VIEW (Fields: id, name, email + details) */}
        {!loading && !error && filteredEmployees.length > 0 && viewMode === 'card' && (
          <div className="p-4">
            <div className="row g-4">
              {filteredEmployees.map((emp) => (
                <div key={emp.id} className="col-12 col-md-6 col-lg-4">
                  <div className="employee-grid-card">
                    {/* Header: ID & Badge */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="id-pill">#{emp.id}</span>
                      {emp.isCustom ? (
                        <span className="badge badge-soft-success">Form Input</span>
                      ) : (
                        <span className="badge badge-soft-primary">API Synced</span>
                      )}
                    </div>

                    {/* Field: Name */}
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="employee-avatar" style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}>
                        {emp.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h5 className="mb-0 text-dark fw-bold">{emp.name}</h5>
                        <div className="small text-muted">{emp.company}</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <hr className="my-2 text-muted opacity-25" />

                    {/* Details list */}
                    <div className="d-flex flex-column gap-2 mt-2 flex-grow-1">
                      {/* Field: Email */}
                      <div className="d-flex align-items-center gap-2 small">
                        <Mail size={15} className="text-primary flex-shrink-0" />
                        <span className="text-muted">Email:</span>
                        <a
                          href={`mailto:${emp.email}`}
                          className="text-decoration-none text-primary fw-medium text-truncate"
                          title={emp.email}
                        >
                          {emp.email}
                        </a>
                      </div>

                      {/* Field: Designation */}
                      <div className="d-flex align-items-center gap-2 small">
                        <Briefcase size={15} className="text-secondary flex-shrink-0" />
                        <span className="text-muted">Role:</span>
                        <span className="text-dark fw-medium text-truncate">{emp.designation}</span>
                      </div>

                      {/* Field: Location */}
                      <div className="d-flex align-items-center gap-2 small">
                        <MapPin size={15} className="text-secondary flex-shrink-0" />
                        <span className="text-muted">Location:</span>
                        <span className="text-dark">{emp.location}</span>
                      </div>

                      {/* Field: Salary */}
                      <div className="d-flex align-items-center gap-2 small">
                        <DollarSign size={15} className="text-success flex-shrink-0" />
                        <span className="text-muted">Salary:</span>
                        <span className="fw-bold text-dark">${Number(emp.salary).toLocaleString()} / yr</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer info note inside card */}
        <div className="p-3 bg-light border-top d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2 text-muted small">
          <div>
            Data sourced in real-time from{' '}
            <code className="text-primary">https://jsonplaceholder.typicode.com/users</code>
          </div>
          <div>
            Displaying required fields: <strong className="text-dark">id</strong>, <strong className="text-dark">name</strong>, and <strong className="text-dark">email</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
