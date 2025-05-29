import React, { createContext, useState } from 'react';
import { Task, TaskContextType } from '../types';
import { useEmployees } from './EmployeeContext';

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { updateEmployee, getEmployee } = useEmployees();

  const addTask = (task: Task) => {
    setTasks(prevTasks => {
      const newTasks = [...prevTasks, task];
      
      // If the task is assigned to an employee, update their tasks array
      if (task.assignedTo) {
        const employee = getEmployee(task.assignedTo);
        if (employee) {
          updateEmployee(employee.id, {
            tasks: [...(employee.tasks || []), task]
          });
        }
      }
      
      return newTasks;
    });
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(prevTasks => {
      const newTasks = prevTasks.map(task => {
        if (task.id === id) {
          const updated = { ...task, ...updatedTask };
          
          // If this task is assigned to an employee, update their tasks array
          if (task.assignedTo) {
            const employee = getEmployee(task.assignedTo);
            if (employee) {
              const updatedTasks = employee.tasks?.map(t => 
                t.id === id ? updated : t
              ) || [];
              updateEmployee(employee.id, { tasks: updatedTasks });
            }
          }
          
          return updated;
        }
        return task;
      });
      return newTasks;
    });
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => {
      const taskToDelete = prevTasks.find(t => t.id === id);
      
      // If the task was assigned to an employee, remove it from their tasks array
      if (taskToDelete?.assignedTo) {
        const employee = getEmployee(taskToDelete.assignedTo);
        if (employee) {
          updateEmployee(employee.id, {
            tasks: employee.tasks?.filter(t => t.id !== id) || []
          });
        }
      }
      
      return prevTasks.filter(task => task.id !== id);
    });
  };

  const getTasksByEmployee = (employeeId: string) => {
    return tasks.filter(task => task.assignedTo === employeeId);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        getTasksByEmployee,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};