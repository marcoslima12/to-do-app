import { createContext, useContext, ReactNode, useReducer } from "react";

interface Task {
  id: string;
  title: string;
  desc?: string;
  deadline: Date;
  isDone: boolean;
}

type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "TOGGLE_TASK_DONE"; payload: { id: string; isDone: boolean } };

const initialState: Task[] = [];

function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    case "TOGGLE_TASK_DONE":
      return state
        .map((task) =>
          task.id === action.payload.id
            ? { ...task, isDone: action.payload.isDone }
            : task
        )
        .sort((a, b) => Number(a.isDone) - Number(b.isDone));

    default:
      return state;
  }
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskDone: (id: string, isDone: boolean) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  const addTask = (task: Task) => {
    dispatch({ type: "ADD_TASK", payload: task });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const toggleTaskDone = (id: string, isDone: boolean) => {
    dispatch({ type: "TOGGLE_TASK_DONE", payload: { id, isDone } });
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
