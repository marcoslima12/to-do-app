import { createContext, ReactNode, useReducer } from "react";
import api from "../services/api";
import { TaskInputType } from "../types";

interface Task {
  id: string;
  userId: number;
  title: string;
  desc?: string;
  deadline: Date;
  isDone: boolean;
}

type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] }
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
  addTask: (task: TaskInputType, userId: string) => void;
  deleteTask: (id: string) => void;
  toggleTaskDone: (id: string, isDone: boolean) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  const setTasks = (tasks: Task[]) => {
    dispatch({ type: "SET_TASKS", payload: tasks });
  };

  const addTask = async (task: TaskInputType, userId: string) => {
    try {
      const response = await api.post(`/tasks/user/${userId}`, {
        title: task.title,
        desc: task.desc,
        deadline: task.deadline,
      });
      dispatch({ type: "ADD_TASK", payload: response.data });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      dispatch({ type: "DELETE_TASK", payload: taskId });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTaskDone = async (id: string, isDone: boolean) => {
    try {
      await api.patch(`/tasks/done/${id}`, { isDone });
      dispatch({ type: "TOGGLE_TASK_DONE", payload: { id, isDone } });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, addTask, deleteTask, toggleTaskDone }}
    >
      {children}
    </TaskContext.Provider>
  );
};
