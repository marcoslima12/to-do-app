import { createContext, useContext, useState, ReactNode } from "react";

interface Task {
  title: string;
  desc?: string;
  deadline: Date;
  isDone: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (title: string) => void;
  toggleTaskDone: (title: string, isDone: boolean) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (title: string) => {
    setTasks(tasks.filter((task) => task.title !== title));
  };

  const toggleTaskDone = (title: string, isDone: boolean) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.title === title ? { ...task, isDone } : task
      );
      return updatedTasks.sort((a, b) => Number(a.isDone) - Number(b.isDone));
    });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, toggleTaskDone }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};