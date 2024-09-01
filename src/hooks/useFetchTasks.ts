import { useEffect } from "react";
import { useTasks } from "./useTask";
import api from "../services/api";

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