import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  UserPlus, 
  User, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Mail, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useEmployees } from '../context/EmployeeContext';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { addEmployee } = useEmployees();

  // Form State with required fields: Name, Designation, Location, Salary
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: '',
    email: '' // optional custom email, fallback auto-generated
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Validation function for required fields
  const validateForm = () => {
    const newErrors = {};

    // 1. Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Employee name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    // 2. Designation validation
    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation/Job role is required.';
    }

    // 3. Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Work location is required.';
    }

    // 4. Salary validation
    if (!formData.salary) {
      newErrors.salary = 'Annual salary is required.';
    } else if (isNaN(Number(formData.salary)) || Number(formData.salary) <= 0) {
      newErrors.salary = 'Please enter a valid positive salary amount.';
    }

    // Optional email validation if provided
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate rapid responsive processing
    setTimeout(() => {
      const createdEmployee = addEmployee({
        name: formData.name,
        designation: formData.designation,
        location: formData.location,
        salary: formData.salary,
        email: formData.email
      });

      setIsSubmitting(false);
      setSuccessMessage({
        title: 'Employee Successfully Registered!',
        description: `${createdEmployee.name} (ID: #${createdEmployee.id}) has been added to the Employee Directory.`
      });

      // Clear form
      setFormData({
        name: '',
        designation: '',
        location: '',
        salary: '',
        email: ''
      });
      setErrors({});
    }, 400);
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      name: '',
      designation: '',
      location: '',
      salary: '',
      email: ''
    });
    setErrors({});
    setSuccessMessage(null);
  };

  return (
    <div className="container">
      {/* Breadcrumb / Back button */}
      <div className="mb-4">
        <Link to="/" className="text-decoration-none text-muted d-inline-flex align-items-center gap-2 small fw-semibold hover-primary">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-7">
          {/* Success Banner */}
          {successMessage && (
            <div className="alert alert-success border-0 shadow-sm rounded-4 p-4 mb-4 d-flex align-items-start gap-3">
              <CheckCircle2 size={28} className="text-success flex-shrink-0 mt-1" />
              <div className="flex-grow-1">
                <h5 className="alert-heading fw-bold mb-1">{successMessage.title}</h5>
                <p className="mb-3 text-secondary small">{successMessage.description}</p>
                <div className="d-flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate('/')}
                    className="btn btn-success btn-sm px-3 fw-semibold rounded-3"
                  >
                    View in Dashboard
                  </button>
                  <button
                    onClick={() => setSuccessMessage(null)}
                    className="btn btn-outline-success btn-sm px-3 rounded-3"
                  >
                    Add Another Employee
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Employee Form Card */}
          <div className="form-card">
            {/* Card Header */}
            <div className="d-flex align-items-center justify-content-between pb-3 mb-4 border-bottom">
              <div className="d-flex align-items-center gap-3">
                <div className="metric-icon-box" style={{ background: '#eff6ff', color: '#2563eb' }}>
                  <UserPlus size={24} />
                </div>
                <div>
                  <h2 className="h4 mb-1 text-dark fw-bold">Employee Registration Form</h2>
                  <p className="text-muted small mb-0">Fill in the employee details below to add them to the portal.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Field 1: Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label-custom">
                  <User size={16} className="text-primary" />
                  <span>Full Name</span>
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control form-control-custom ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name ? (
                  <div className="invalid-feedback d-flex align-items-center gap-1 mt-1">
                    <AlertCircle size={14} /> {errors.name}
                  </div>
                ) : (
                  <div className="form-text small text-muted">Enter employee's first and last name.</div>
                )}
              </div>

              {/* Field 2: Designation */}
              <div className="mb-3">
                <label htmlFor="designation" className="form-label-custom">
                  <Briefcase size={16} className="text-primary" />
                  <span>Designation / Job Role</span>
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  list="designation-suggestions"
                  className={`form-control form-control-custom ${errors.designation ? 'is-invalid' : ''}`}
                  placeholder="e.g. Senior Frontend Developer"
                  value={formData.designation}
                  onChange={handleChange}
                />
                <datalist id="designation-suggestions">
                  <option value="Senior Frontend Developer" />
                  <option value="Full Stack Engineer" />
                  <option value="Backend Developer" />
                  <option value="UI/UX Designer" />
                  <option value="Product Manager" />
                  <option value="Data Scientist" />
                  <option value="QA Test Engineer" />
                  <option value="HR Specialist" />
                  <option value="DevOps Specialist" />
                </datalist>
                {errors.designation ? (
                  <div className="invalid-feedback d-flex align-items-center gap-1 mt-1">
                    <AlertCircle size={14} /> {errors.designation}
                  </div>
                ) : (
                  <div className="form-text small text-muted">Select from suggestions or enter any custom title.</div>
                )}
              </div>

              {/* Row for Location & Salary */}
              <div className="row g-3 mb-3">
                {/* Field 3: Location */}
                <div className="col-12 col-md-6">
                  <label htmlFor="location" className="form-label-custom">
                    <MapPin size={16} className="text-primary" />
                    <span>Location</span>
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    list="location-suggestions"
                    className={`form-control form-control-custom ${errors.location ? 'is-invalid' : ''}`}
                    placeholder="e.g. San Francisco, CA"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  <datalist id="location-suggestions">
                    <option value="New York, NY" />
                    <option value="San Francisco, CA" />
                    <option value="Austin, TX" />
                    <option value="London, UK" />
                    <option value="Bangalore, India" />
                    <option value="Berlin, Germany" />
                    <option value="Remote / Work From Home" />
                  </datalist>
                  {errors.location && (
                    <div className="invalid-feedback d-flex align-items-center gap-1 mt-1">
                      <AlertCircle size={14} /> {errors.location}
                    </div>
                  )}
                </div>

                {/* Field 4: Salary */}
                <div className="col-12 col-md-6">
                  <label htmlFor="salary" className="form-label-custom">
                    <DollarSign size={16} className="text-primary" />
                    <span>Annual Salary (USD)</span>
                    <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 fw-semibold text-muted">$</span>
                    <input
                      type="number"
                      id="salary"
                      name="salary"
                      min="0"
                      step="500"
                      className={`form-control form-control-custom border-start-0 ${errors.salary ? 'is-invalid' : ''}`}
                      placeholder="e.g. 85000"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.salary && (
                    <div className="invalid-feedback d-block d-flex align-items-center gap-1 mt-1">
                      <AlertCircle size={14} /> {errors.salary}
                    </div>
                  )}
                </div>
              </div>

              {/* Optional Field: Email */}
              <div className="mb-4">
                <label htmlFor="email" className="form-label-custom">
                  <Mail size={16} className="text-muted" />
                  <span>Work Email (Optional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control form-control-custom ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="e.g. s.jenkins@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email ? (
                  <div className="invalid-feedback d-flex align-items-center gap-1 mt-1">
                    <AlertCircle size={14} /> {errors.email}
                  </div>
                ) : (
                  <div className="form-text small text-muted">
                    Leave blank to automatically generate an email based on the employee's name.
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-end gap-3 pt-3 border-top">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-secondary-custom w-100 w-sm-auto d-flex align-items-center justify-content-center gap-2"
                >
                  <RotateCcw size={16} />
                  <span>Reset Form</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary-custom w-100 w-sm-auto"
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      <span>Submit Employee</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
