export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  password?: string;
}

export interface Employee extends User {
  position: string;
  department: string;
  joinDate: string;
  salary: number;
  contactNumber: string;
  address: string;
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  assignedTo?: string; // Employee ID
  assignedBy?: string; // Admin ID
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksByEmployee: (employeeId: string) => Task[];
}