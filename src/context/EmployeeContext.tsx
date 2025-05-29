import React, { createContext, useState, useContext, useEffect } from 'react';
import { Employee } from '../types';
import { mockEmployees } from '../data/mockData';

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, updatedEmployee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  getEmployee: (id: string) => Employee | undefined;
  searchEmployees: (query: string) => Employee[];
  filterEmployees: (department: string) => Employee[];
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setEmployees(mockEmployees);
  }, []);

  const addEmployee = (employee: Employee) => {
    setEmployees([...employees, employee]);
  };

  const updateEmployee = (id: string, updatedEmployee: Partial<Employee>) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, ...updatedEmployee } : employee
      )
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const getEmployee = (id: string) => {
    return employees.find((employee) => employee.id === id);
  };

  const searchEmployees = (query: string) => {
    if (!query) return employees;
    
    const lowercaseQuery = query.toLowerCase();
    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(lowercaseQuery) ||
        employee.email.toLowerCase().includes(lowercaseQuery) ||
        employee.department.toLowerCase().includes(lowercaseQuery) ||
        employee.position.toLowerCase().includes(lowercaseQuery)
    );
  };

  const filterEmployees = (department: string) => {
    if (!department || department === 'all') return employees;
    return employees.filter((employee) => employee.department === department);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployee,
        searchEmployees,
        filterEmployees,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};