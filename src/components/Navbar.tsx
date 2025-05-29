import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-indigo-200 hover:text-white focus:outline-none"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="ml-4 flex items-center">
              <span className="text-xl font-bold">EMS</span>
              <span className="ml-2 text-indigo-200">Employee Management System</span>
            </Link>
          </div>
          <div className="flex items-center">
            {user && (
              <>
                <div className="mr-4 hidden md:flex items-center">
                  <User size={18} className="mr-1" />
                  <span className="text-sm font-medium">
                    {user.name} ({user.role})
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none transition"
                >
                  <LogOut size={16} className="mr-1" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;