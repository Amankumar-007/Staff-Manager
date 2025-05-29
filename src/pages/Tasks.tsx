import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import { useTasks } from '../hooks/useTasks';
import TaskList from '../components/TaskList';
import { ClipboardList } from 'lucide-react';

const Tasks: React.FC = () => {
  const { user } = useAuth();
  const { employees } = useEmployees();
  const { getTasksByEmployee } = useTasks();
  
  // Find the current employee's full details
  const currentEmployee = employees.find((emp) => emp.email === user?.email);
  const tasks = currentEmployee ? getTasksByEmployee(currentEmployee.id) : [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-600">View and manage your assigned tasks</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <ClipboardList size={24} className="text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Task List</h2>
        </div>

        <TaskList tasks={tasks} showActions={true} />
      </div>
    </div>
  );
};

export default Tasks;