import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import { useTasks } from '../hooks/useTasks';
import TaskList from '../components/TaskList';
import { User, Calendar, Mail, Phone, MapPin, Briefcase, Building, Lock, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const { employees } = useEmployees();
  const { getTasksByEmployee } = useTasks();
  
  // Find the current employee's full details
  const currentEmployee = employees.find((emp) => emp.email === user?.email);

  if (!currentEmployee) {
    return (
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm"
        >
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Employee information not found. Please contact your administrator.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const employeeTasks = getTasksByEmployee(currentEmployee.id);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 min-h-screen bg-gray-50"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back,</h1>
        <p className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text font-bold">
          {currentEmployee.name}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm border border-gray-100">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
              <motion.div
                className="flex justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="rounded-full bg-white/90 p-3 shadow-xl">
                  <User size={48} className="text-indigo-600" />
                </div>
              </motion.div>
              <h2 className="mt-4 text-center text-xl font-bold text-white">
                {currentEmployee.name}
              </h2>
              <p className="text-center text-indigo-100 font-medium">{currentEmployee.position}</p>
            </div>
            <div className="p-6 space-y-6">
              <motion.div className="space-y-4" variants={itemVariants}>
                <div className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <Briefcase size={20} className="text-indigo-600 mr-3" />
                  <span className="text-gray-700 font-medium">{currentEmployee.department}</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <Mail size={20} className="text-indigo-600 mr-3" />
                  <span className="text-gray-700 font-medium">{currentEmployee.email}</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <Phone size={20} className="text-indigo-600 mr-3" />
                  <span className="text-gray-700 font-medium">{currentEmployee.contactNumber}</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <MapPin size={20} className="text-indigo-600 mr-3" />
                  <span className="text-gray-700 font-medium">{currentEmployee.address}</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <Calendar size={20} className="text-indigo-600 mr-3" />
                  <span className="text-gray-700 font-medium">Joined: {currentEmployee.joinDate}</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <Building size={20} className="text-indigo-600 mr-3" />
                  <span className="text-gray-700 font-medium">
                    Salary: ${currentEmployee.salary.toLocaleString()}
                  </span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/profile"
                  className="block w-full text-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                >
                  Edit Profile
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Calendar className="mr-2 text-indigo-600" />
              My Tasks
            </h2>
            <TaskList tasks={employeeTasks} showActions={true} />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Settings className="mr-2 text-indigo-600" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/profile"
                  className="block bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 p-6 rounded-xl transition-all group"
                >
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-white rounded-lg shadow-md group-hover:shadow-lg transition-all">
                      <User size={24} className="text-indigo-600" />
                    </div>
                    <span className="mt-3 text-indigo-900 font-semibold">My Profile</span>
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/tasks"
                  className="block bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 p-6 rounded-xl transition-all group"
                >
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-white rounded-lg shadow-md group-hover:shadow-lg transition-all">
                      <Calendar size={24} className="text-purple-600" />
                    </div>
                    <span className="mt-3 text-purple-900 font-semibold">My Tasks</span>
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/change-password"
                  className="block bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-6 rounded-xl transition-all group"
                >
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-white rounded-lg shadow-md group-hover:shadow-lg transition-all">
                      <Lock size={24} className="text-blue-600" />
                    </div>
                    <span className="mt-3 text-blue-900 font-semibold">Change Password</span>
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/settings"
                  className="block bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 p-6 rounded-xl transition-all group"
                >
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-white rounded-lg shadow-md group-hover:shadow-lg transition-all">
                      <Settings size={24} className="text-emerald-600" />
                    </div>
                    <span className="mt-3 text-emerald-900 font-semibold">Settings</span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmployeeDashboard;