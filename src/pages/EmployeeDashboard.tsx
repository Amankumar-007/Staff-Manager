import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import TaskList from '../components/TaskList';
import { User, Calendar, Mail, Phone, MapPin, Briefcase, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const { employees } = useEmployees();
  
  // Find the current employee's full details
  const currentEmployee = employees.find((emp) => emp.email === user?.email);

  if (!currentEmployee) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Employee information not found. Please contact your administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
        <p className="text-gray-600">Welcome back, {currentEmployee.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-600 p-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-white p-2">
                  <User size={64} className="text-indigo-600" />
                </div>
              </div>
              <h2 className="mt-4 text-center text-xl font-bold text-white">
                {currentEmployee.name}
              </h2>
              <p className="text-center text-indigo-200">{currentEmployee.position}</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Briefcase size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">{currentEmployee.department}</span>
                </div>
                <div className="flex items-center">
                  <Mail size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">{currentEmployee.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">{currentEmployee.contactNumber}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">{currentEmployee.address}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">Joined: {currentEmployee.joinDate}</span>
                </div>
                <div className="flex items-center">
                  <Building size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">
                    Salary: ${currentEmployee.salary.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/profile"
                  className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Tasks</h2>
            <TaskList tasks={currentEmployee.tasks || []} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/profile"
                className="bg-indigo-50 hover:bg-indigo-100 p-4 rounded-lg transition"
              >
                <div className="flex flex-col items-center">
                  <User size={24} className="text-indigo-600 mb-2" />
                  <span className="text-indigo-700 font-medium">My Profile</span>
                </div>
              </Link>
              <Link
                to="/tasks"
                className="bg-green-50 hover:bg-green-100 p-4 rounded-lg transition"
              >
                <div className="flex flex-col items-center">
                  <Calendar size={24} className="text-green-600 mb-2" />
                  <span className="text-green-700 font-medium">My Tasks</span>
                </div>
              </Link>
              <Link
                to="/change-password"
                className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg transition"
              >
                <div className="flex flex-col items-center">
                  <Lock size={24} className="text-purple-600 mb-2" />
                  <span className="text-purple-700 font-medium">Change Password</span>
                </div>
              </Link>
              <Link
                to="/settings"
                className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition"
              >
                <div className="flex flex-col items-center">
                  <Settings size={24} className="text-blue-600 mb-2" />
                  <span className="text-blue-700 font-medium">Settings</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;