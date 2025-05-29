import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  UserPlus, 
  Home, 
  User, 
  Settings, 
  ClipboardList, 
  Lock
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto`}
    >
      <div className="p-6">
        <div className="flex items-center justify-center mb-8">
          <Users size={28} className="text-indigo-400" />
          <span className="ml-2 text-xl font-semibold">EMS Portal</span>
        </div>

        <nav className="space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? 'bg-indigo-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`
            }
          >
            <Home size={20} className="mr-3" />
            <span>Dashboard</span>
          </NavLink>

          {isAdmin && (
            <>
              <NavLink
                to="/employees"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? 'bg-indigo-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`
                }
              >
                <Users size={20} className="mr-3" />
                <span>Employees</span>
              </NavLink>

              <NavLink
                to="/add-employee"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? 'bg-indigo-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`
                }
              >
                <UserPlus size={20} className="mr-3" />
                <span>Add Employee</span>
              </NavLink>
            </>
          )}

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? 'bg-indigo-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`
            }
          >
            <User size={20} className="mr-3" />
            <span>My Profile</span>
          </NavLink>

          {!isAdmin && (
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? 'bg-indigo-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`
              }
            >
              <ClipboardList size={20} className="mr-3" />
              <span>My Tasks</span>
            </NavLink>
          )}

          <NavLink
            to="/change-password"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? 'bg-indigo-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`
            }
          >
            <Lock size={20} className="mr-3" />
            <span>Change Password</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? 'bg-indigo-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`
            }
          >
            <Settings size={20} className="mr-3" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;