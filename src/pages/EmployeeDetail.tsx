import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import TaskList from '../components/TaskList';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Briefcase, 
  Building,
  Edit,
  Trash2,
  ArrowLeft,
  ClipboardList
} from 'lucide-react';

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEmployee, deleteEmployee } = useEmployees();
  const navigate = useNavigate();
  
  const employee = getEmployee(id || '');

  if (!employee) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Employee not found. The employee may have been deleted or you may have insufficient permissions.
              </p>
              <div className="mt-4">
                <Link
                  to="/employees"
                  className="text-sm font-medium text-red-700 hover:text-red-600"
                >
                  ← Back to Employees
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(employee.id);
      navigate('/employees');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/employees"
            className="mr-4 text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span>Back</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Employee Details</h1>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/assign-task/${employee.id}`}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            <ClipboardList size={16} className="mr-2" />
            Assign Task
          </Link>
          <Link
            to={`/edit-employee/${employee.id}`}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            <Edit size={16} className="mr-2" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </button>
        </div>
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
                {employee.name}
              </h2>
              <p className="text-center text-indigo-200">{employee.position}</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Briefcase size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">{employee.department}</span>
                </div>
                <div className="flex items-center">
                  <Mail size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">{employee.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">{employee.contactNumber}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">{employee.address}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">Joined: {employee.joinDate}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">
                    Salary: ${employee.salary.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Building size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">Role: {employee.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Assigned Tasks</h2>
            <TaskList tasks={employee.tasks || []} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance Overview</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Task Completion</span>
                  <span className="text-sm font-medium text-gray-700">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Attendance</span>
                  <span className="text-sm font-medium text-gray-700">90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Productivity</span>
                  <span className="text-sm font-medium text-gray-700">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;