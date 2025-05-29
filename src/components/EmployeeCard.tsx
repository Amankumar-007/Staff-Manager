import React from 'react';
import { Link } from 'react-router-dom';
import { Employee } from '../types';
import { Mail, Phone, Calendar, DollarSign, Building } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  onDelete?: (id: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{employee.name}</h3>
            <p className="text-indigo-600 font-medium">{employee.position}</p>
          </div>
          <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            {employee.department}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600">
            <Mail size={16} className="mr-2" />
            <span>{employee.email}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone size={16} className="mr-2" />
            <span>{employee.contactNumber}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span>Joined: {employee.joinDate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign size={16} className="mr-2" />
            <span>${employee.salary.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Building size={16} className="mr-2" />
            <span>{employee.address}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Link
            to={`/employee/${employee.id}`}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View Details
          </Link>
          <div className="space-x-2">
            <Link
              to={`/edit-employee/${employee.id}`}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
            >
              Edit
            </Link>
            {onDelete && (
              <button
                onClick={() => onDelete(employee.id)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;