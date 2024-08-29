import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { logOut } from "../../services/auth";
import { useEffect } from "react";
import { Task } from "../../components/Task";
import { Logout } from "../../components/IconLogout";
import data from "./mock/index.json";
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { TaskModal } from "../../components/Modal";

export const Home: React.FC = () => {
  const tasks = data.data;
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreateTask = (data: { title: string; desc: string; deadline: Date }) => {
    console.log(data);
    handleCloseModal();
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen h-4/5 w-full flex flex-col lg:flex-row">

      <Sidebar />
      <Header />

      <div className="flex-1 flex flex-col px-5 pt-20 lg:pl-96">
        <div className="flex lg:hidden items-center justify-between mb-6">
          <h1 className="font-bold text-xl text-white">
            Olá, {currentUser?.displayName}!
          </h1>
          <button onClick={handleLogout}>
            <Logout />
          </button>
        </div>

        <div className="w-full flex justify-between pt-8">
          <h2 className="text-sm text-white uppercase lg:normal-case lg:font-bold lg:text-2xl">
            Minhas tasks
          </h2>
          <button
            onClick={handleOpenModal}
            className="text-3xl custom-gradient hover:custom-gradient:hover text-white rounded-full w-12 h-12 hidden lg:flex items-center justify-center shadow-lg "
          >
            +
          </button>
        </div>

        {tasks.map((task) => {
          return (
            <Task deadline={new Date()} title={task.title} desc={task.desc} />
          );
        })}
        <Task
          deadline={new Date()}
          title="Frontend do app"
          desc="Fazer todo o frontend até hoje"
        />
        <Task
          deadline={new Date("03/24/2024")}
          title="Backend da neurotech"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa adipisci rem quia pariatur nobis obcaecati cum porro dolores excepturi. Quis maxime consequatur, quisquam libero ipsa blanditiis tempore eligendi nesciunt culpa?"
        />
        <Task deadline={new Date("12/24/2024")} title="Fazer a API bem feita" />

        <button
          onClick={handleOpenModal}
          className="text-3xl fixed bottom-5 right-5 custom-gradient hover:custom-gradient:hover text-white rounded-full w-12 h-12 flex lg:hidden items-center justify-center shadow-lg "
        >
          +
        </button>

        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleCreateTask}
        />
      </div>
    </div>
  );
};
