import React, { createContext, useContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

const API_URL = 'https://jsonplaceholder.typicode.com/users';
const LOCAL_STORAGE_KEY = 'employee_hub_custom_users';

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch API data on mount and merge with any custom added employees
  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch data (status: ${response.status})`);
      }
      const data = await response.json();

      // Retrieve locally saved new employees (if any)
      const savedLocal = localStorage.getItem(LOCAL_STORAGE_KEY);
      const customEmployees = savedLocal ? JSON.parse(savedLocal) : [];

      // Format API users
      const formattedApiUsers = data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        designation: user.company?.bs || 'Software Consultant',
        location: `${user.address?.city || 'New York'}`,
        salary: 75000 + (user.id * 3500), // realistic default salary for demo
        isCustom: false,
        phone: user.phone,
        company: user.company?.name || 'TechCorp'
      }));

      // Combine custom added users at the top, then API users
      setEmployees([...customEmployees, ...formattedApiUsers]);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError(err.message || 'An error occurred while fetching employee records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add a newly created employee from the form
  const addEmployee = (newEmployeeData) => {
    // Generate next unique ID
    const maxId = employees.reduce((max, emp) => (Number(emp.id) > max ? Number(emp.id) : max), 0);
    const newId = maxId + 1;

    const newEmp = {
      id: newId,
      name: newEmployeeData.name.trim(),
      email: newEmployeeData.email 
        ? newEmployeeData.email.trim() 
        : `${newEmployeeData.name.toLowerCase().replace(/\s+/g, '.')}@company.com`,
      designation: newEmployeeData.designation.trim(),
      location: newEmployeeData.location.trim(),
      salary: Number(newEmployeeData.salary),
      isCustom: true,
      company: 'Internal Team'
    };

    // Update state
    setEmployees((prev) => [newEmp, ...prev]);

    // Save to localStorage for persistence
    try {
      const savedLocal = localStorage.getItem(LOCAL_STORAGE_KEY);
      const customEmployees = savedLocal ? JSON.parse(savedLocal) : [];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newEmp, ...customEmployees]));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }

    return newEmp;
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        fetchEmployees,
        addEmployee
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};
