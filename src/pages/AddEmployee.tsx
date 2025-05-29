import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import { useForm } from 'react-hook-form';
import { Employee } from '../types';
import { UserPlus, ArrowLeft, AlertCircle } from 'lucide-react';

interface EmployeeFormData {
  name: string;
  email: string;
  position: string;
  department: string;
  joinDate: string;
  salary: number;
  contactNumber: string;
  address: string;
}

const AddEmployee: React.FC = () => {
  const { addEmployee } = useEmployees();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>();

  const onSubmit = (data: EmployeeFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Create a new employee object
      const newEmployee: Employee = {
        id: `e${Date.now()}`, // Generate a unique ID
        ...data,
        role: 'employee',
        tasks: [],
      };

      // Add the employee to the context
      addEmployee(newEmployee);
      
      // Navigate back to the employees list
      navigate('/employees');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while adding the employee.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center">
        <Link
          to="/employees"
          className="mr-4 text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                  errors.name ? 'border-red-300' : ''
                }`}
                {...register('name', {
                  required: 'Name is required',
                })}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                  errors.email ? 'border-red-300' : ''
                }`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                id="position"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                  errors.position ? 'border-red-300' : ''
                }`}
                {...register('position', {
                  required: 'Position is required',
                })}
              />
              {errors.position && (
                <p className="mt-2 text-sm text-red-600">{errors.position.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                id="department"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                  errors.department ? 'border-red-300' : ''
                }`}
                {...register('department', {
                  required: 'Department is required',
                })}
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Product">Product</option>
                <option value="Sales">Sales</option>
                <option value="Customer Support">Customer Support</option>
              </select>
              {errors.department && (
                <p className="mt-2 text-sm text-red-600">{errors.department.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">
                Join Date
              </label>
              <input
                type="date"
                id="joinDate"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                  errors.joinDate ? 'border-red-300' : ''
                }`}
                {...register('joinDate', {
                  required: 'Join date is required',
                })}
              />
              {errors.joinDate && (
                <p className="mt-2 text-sm text-red-600">{errors.joinDate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="salary"
                  className={`mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.salary ? 'border-red-300' : ''
                  }`}
                  placeholder="0.00"
                  {...register('salary', {
                    required: 'Salary is required',
                    min: {
                      value: 0,
                      message: 'Salary must be a positive number',
                    },
                  })}
                />
              </div>
              {errors.salary && (
                <p className="mt-2 text-sm text-red-600">{errors.salary.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                  errors.contactNumber ? 'border-red-300' : ''
                }`}
                {...register('contactNumber', {
                  required: 'Contact number is required',
                })}
              />
              {errors.contactNumber && (
                <p className="mt-2 text-sm text-red-600">{errors.contactNumber.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                id="address"
                rows={3}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                  errors.address ? 'border-red-300' : ''
                }`}
                {...register('address', {
                  required: 'Address is required',
                })}
              ></textarea>
              {errors.address && (
                <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              to="/employees"
              className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? (
                'Adding...'
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Add Employee
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;