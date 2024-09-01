import { createContext, useContext, ReactNode, useReducer, useEffect } from "react";
import api from "../services/api";
import { TaskType } from "../types";

interface Task {
  id: string;
  userId: number;
  title: string;
  desc?: string;
  deadline: Date;
  isDone: boolean;
}

type TaskAction =
  | {type: "SET_TASKS"; payload: Task[]}
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "TOGGLE_TASK_DONE"; payload: { id: string; isDone: boolean } };

const initialState: Task[] = [];

function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "SET_TASKS":
      return action.payload;

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
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task, userId: string) => void;
  deleteTask: (id: string) => void;
  toggleTaskDone: (id: string, isDone: boolean) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  const setTasks = (tasks: Task[]) => {
    dispatch({ type: "SET_TASKS", payload: tasks });
  };

  const addTask = async (task: TaskType, userId: string) => {
    try {
      const response = await api.post(`/tasks/createTask/${userId}`, {
        title: task.title,
        desc: task.desc,
        deadline: task.deadline
      });
      dispatch({ type: "ADD_TASK", payload: response.data });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const toggleTaskDone = (id: string, isDone: boolean) => {
    dispatch({ type: "TOGGLE_TASK_DONE", payload: { id, isDone } });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, addTask, deleteTask, toggleTaskDone }}
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

// eslint-disable-next-line react-refresh/only-export-components
export const useFetchTasks = (userId: string) => {
  const { setTasks } = useTasks();

  useEffect(() => {
    async function fetchTasks() {
      const response = await api.get(`/tasks/user/${userId}`);
      console.log(response.data)
      setTasks(response.data);
    }

    fetchTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
};
