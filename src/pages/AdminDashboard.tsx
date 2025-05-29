import React, { useState } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeCard from '../components/EmployeeCard';
import SearchFilter from '../components/SearchFilter';
import { Employee } from '../types';
import { Grid, List, Users, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { employees, searchEmployees, filterEmployees, deleteEmployee } = useEmployees();
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const handleSearch = (query: string) => {
    setFilteredEmployees(searchEmployees(query));
  };

  const handleFilter = (department: string) => {
    setFilteredEmployees(filterEmployees(department));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
      setFilteredEmployees(filteredEmployees.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your employees and company data</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="bg-indigo-500 p-3 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">Total Employees</h2>
                <p className="text-2xl font-bold text-indigo-600">{employees.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">Departments</h2>
                <p className="text-2xl font-bold text-green-600">
                  {new Set(employees.map((e) => e.department)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">New This Month</h2>
                <p className="text-2xl font-bold text-purple-600">2</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Employee Management</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md ${
                viewMode === 'table'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Grid size={20} />
            </button>
            <Link
              to="/add-employee"
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              <UserPlus size={18} className="mr-2" />
              Add Employee
            </Link>
          </div>
        </div>

        <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />

        {filteredEmployees.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No employees found matching your criteria.</p>
          </div>
        ) : viewMode === 'table' ? (
          <EmployeeTable employees={filteredEmployees} onDelete={handleDelete} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;