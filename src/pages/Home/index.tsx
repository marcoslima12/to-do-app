import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../services/auth";
import { Task } from "../../components/Task";
import { Logout } from "../../components/IconLogout";
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { TaskModal } from "../../components/Modals/TaskModal";
import { Add } from "../../components/Add";
import { TaskInputType } from "../../types";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { useTasks } from "../../hooks/useTask";
import { useFetchTasks } from "../../hooks/useFetchTasks";
import { Modal } from "../../components/Modals/DefaultModal";

export const Home = () => {
  const { tasks, addTask } = useTasks();
  const { fetchAndSetUser, user } = useUser();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  useFetchTasks(user?.id || "");

  useEffect(() => {
    if (currentUser) fetchAndSetUser(currentUser.email!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const [logOutModal, setLogOutModal] = useState(false);
  const handleOpenModalLogout = () => setLogOutModal(true);
  const handleCloseModalLogout = () => setLogOutModal(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreateTask = (data: {
    title: string;
    desc?: string;
    deadline: Date;
  }) => {
    const newTask: TaskInputType = {
      deadline: data.deadline,
      title: data.title,
      desc: data.desc,
    };

    addTask(newTask, user?.id || "");
    handleCloseModal();
  };

  const filteredTasks = tasks.filter((task) =>
    activeTab === "active" ? !task.isDone : task.isDone
  );

  const LogoutComponent = () => {
    return <span className="text-white">Você realmente deseja sair?</span>;
  };

  return (
    <>
      <div className="min-h-screen h-4/5 w-full flex flex-col lg:flex-row">
        <Sidebar />
        <Header />
        <div className="w-full flex-1 flex flex-col px-5 pt-20 lg:pl-96">
          <div className="flex lg:hidden items-center justify-between mb-6">
            <h1 className="font-bold text-xl text-white">
              Olá, {currentUser?.displayName}!
            </h1>
            <button onClick={handleOpenModalLogout}>
              <Logout />
            </button>
          </div>

          <div className="w-full flex justify-between pt-8">
            <h2 className="text-sm text-white uppercase lg:normal-case lg:font-bold lg:text-2xl">
              Minhas tasks
            </h2>
            <button
              onClick={handleOpenModal}
              className="text-3xl custom-gradient hover:custom-gradient:hover text-white rounded-full w-12 h-12 hidden lg:flex lg:items-center lg:justify-center shadow-lg "
            >
              <Add />
            </button>
          </div>

          <div className="flex justify-center gap-4 my-4">
            <button
              className={`text-sm lg:text-base font-bold ${
                activeTab === "active" ? "text-highlight" : "text-white"
              }`}
              onClick={() => setActiveTab("active")}
            >
              EM ANDAMENTO
            </button>
            <button
              className={`text-sm lg:text-base font-bold ${
                activeTab === "completed" ? "text-highlight" : "text-white"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              FINALIZADAS
            </button>
          </div>

          <div>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <Task
                  id={task.id}
                  key={task.id}
                  deadline={task.deadline}
                  title={task.title}
                  desc={task.desc}
                  isDone={task.isDone}
                />
              ))
            ) : (
              <div className="text-center text-white font-bold text-lg mt-10">
                {activeTab === "active"
                  ? "Muito bem, você finalizou tudo! Parabéns!"
                  : "Você ainda não tem tarefas finalizadas. Continue trabalhando!"}
              </div>
            )}
          </div>

          <button
            onClick={handleOpenModal}
            className="text-3xl fixed bottom-5 right-5 custom-gradient hover:custom-gradient:hover text-white rounded-full w-12 h-12 flex lg:hidden items-center justify-center shadow-lg "
          >
            <Add />
          </button>

          <TaskModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleCreateTask}
          />
        </div>
      </div>
      <Modal
        cancelText="Não, quero retonar"
        confirmText="Sim, quero sair"
        onConfirm={handleLogout}
        isOpen={logOutModal}
        onClose={handleCloseModalLogout}
        children={<LogoutComponent />}
        title="Fazer logout"
      />
    </>
  );
};
