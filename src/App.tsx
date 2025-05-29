import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { TaskProvider } from './context/TaskContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EmployeeDetail from './pages/EmployeeDetail';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import AssignTask from './pages/AssignTask';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { useAuth } from './context/AuthContext';

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<PrivateRoute />}>
        <Route path="/" element={
          user?.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />
        } />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Admin only routes */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/employees" element={<AdminDashboard />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          <Route path="/assign-task/:employeeId" element={<AssignTask />} />
        </Route>
        
        {/* Employee only routes */}
        <Route element={<PrivateRoute allowedRoles={['employee']} />}>
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <AuthProvider>
        <EmployeeProvider>
          <TaskProvider>
            <div className="min-h-screen bg-gray-100">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={
                  <div className="flex h-screen overflow-hidden">
                    <Sidebar isOpen={sidebarOpen} />
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <Navbar toggleSidebar={toggleSidebar} />
                      <main className="flex-1 overflow-y-auto">
                        <AppRoutes />
                      </main>
                    </div>
                  </div>
                } />
              </Routes>
            </div>
          </TaskProvider>
        </EmployeeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;