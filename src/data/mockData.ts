import { User, Employee, Task } from '../types';

// Mock tasks
const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Complete quarterly report',
    description: 'Finish the Q2 financial report for the board meeting',
    status: 'pending',
    dueDate: '2025-06-30',
  },
  {
    id: 't2',
    title: 'Update employee handbook',
    description: 'Revise the employee handbook with new policies',
    status: 'in-progress',
    dueDate: '2025-07-15',
  },
  {
    id: 't3',
    title: 'Conduct performance reviews',
    description: 'Complete performance reviews for the engineering team',
    status: 'completed',
    dueDate: '2025-06-15',
  },
  {
    id: 't4',
    title: 'Prepare training materials',
    description: 'Create training materials for new hires',
    status: 'pending',
    dueDate: '2025-07-30',
  },
];

// Mock users for authentication
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    password: 'admin123',
  },
  {
    id: 'u2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'employee',
    password: 'employee123',
  },
];

// Mock employees
export const mockEmployees: Employee[] = [
  {
    id: 'e1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'employee',
    position: 'Software Engineer',
    department: 'Engineering',
    joinDate: '2023-01-15',
    salary: 85000,
    contactNumber: '555-123-4567',
    address: '123 Main St, Anytown, USA',
    tasks: [mockTasks[0], mockTasks[1]],
  },
  {
    id: 'e2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'employee',
    position: 'Marketing Specialist',
    department: 'Marketing',
    joinDate: '2022-08-10',
    salary: 75000,
    contactNumber: '555-987-6543',
    address: '456 Oak Ave, Somewhere, USA',
    tasks: [mockTasks[2]],
  },
  {
    id: 'e3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    role: 'employee',
    position: 'Financial Analyst',
    department: 'Finance',
    joinDate: '2023-03-22',
    salary: 80000,
    contactNumber: '555-456-7890',
    address: '789 Pine St, Nowhere, USA',
    tasks: [mockTasks[3]],
  },
  {
    id: 'e4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'employee',
    position: 'HR Specialist',
    department: 'Human Resources',
    joinDate: '2022-11-05',
    salary: 72000,
    contactNumber: '555-789-0123',
    address: '321 Elm St, Elsewhere, USA',
    tasks: [],
  },
  {
    id: 'e5',
    name: 'Robert Wilson',
    email: 'robert@example.com',
    role: 'employee',
    position: 'Product Manager',
    department: 'Product',
    joinDate: '2023-02-18',
    salary: 95000,
    contactNumber: '555-234-5678',
    address: '654 Maple Ave, Anyplace, USA',
    tasks: [],
  },
];

// Departments for filtering
export const departments = [
  'All',
  'Engineering',
  'Marketing',
  'Finance',
  'Human Resources',
  'Product',
];