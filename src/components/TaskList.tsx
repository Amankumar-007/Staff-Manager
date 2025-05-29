import React from 'react';
import { Task } from '../types';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import { Calendar, CheckCircle, Clock, AlertCircle, Check, XCircle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  showActions?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, showActions = false }) => {
  const { user } = useAuth();
  const { updateTask } = useTasks();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'in-progress':
        return <Clock size={18} className="text-yellow-500" />;
      case 'pending':
        return <AlertCircle size={18} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    updateTask(taskId, { status: newStatus });
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No tasks assigned yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded-lg shadow border-l-4 border-indigo-500"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                task.status
              )}`}
            >
              <div className="flex items-center">
                {getStatusIcon(task.status)}
                <span className="ml-1 capitalize">{task.status}</span>
              </div>
            </span>
          </div>
          <p className="mt-2 text-gray-600">{task.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-1" />
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            {showActions && user?.role === 'employee' && (
              <div className="flex space-x-2">
                {task.status !== 'completed' && (
                  <button
                    onClick={() => handleStatusChange(task.id, 'completed')}
                    className="flex items-center px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                  >
                    <Check size={14} className="mr-1" />
                    Mark Complete
                  </button>
                )}
                {task.status === 'pending' && (
                  <button
                    onClick={() => handleStatusChange(task.id, 'in-progress')}
                    className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                  >
                    <Clock size={14} className="mr-1" />
                    Start Task
                  </button>
                )}
                {task.status === 'in-progress' && (
                  <button
                    onClick={() => handleStatusChange(task.id, 'pending')}
                    className="flex items-center px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    <XCircle size={14} className="mr-1" />
                    Stop Task
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;