import { useState } from "react";
import { IconTrash } from "../IconTrash";
import { Modal } from "../Modals/DefaultModal";
import { Check } from "../Check";
import { Uncheck } from "../Uncheck";
import { useTasks } from "../../hooks/useTask";

interface Props {
  id: string;
  title: string;
  desc?: string;
  deadline?: Date;
  isDone: boolean;
}

export const Task = ({
  id,
  desc = "",
  title,
  deadline,
  isDone: initialIsDone,
}: Props) => {
  const { deleteTask, toggleTaskDone } = useTasks();
  const [isDone, setIsDone] = useState(initialIsDone);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDone = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIsDone = !isDone;
    setIsDone(newIsDone);
    toggleTaskDone(id, newIsDone); 
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleDeleteTask = (e: React.MouseEvent) => {
    e.stopPropagation();
     
    deleteTask(id); 
  };

  const TaskModalComponent = () => {
    return (
      <div>
        <h3 className="text-md font-bold lg:text-xl mb-2 text-highlight">
          {title}
        </h3>
        <p className="text-white mb-4 text-sm">{desc}</p>
        {deadline && (
          <span className="text-xs text-highlight text">
            {deadline.toString()}
          </span>
        )}
      </div>
    );
  };

  return (
    <div>
      <div
        onClick={toggleModal}
        className={`w-full bg-primary p-4 flex flex-col gap-2 my-4 rounded cursor-pointer transition-opacity duration-300 task-transition ${
          isDone ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-4/5">
            <span className="text-sm text-highlight">{title}</span>

            <div
              className={`text-xs font-white line-clamp-1 transition-all duration-500`}
            >
              {desc}
            </div>

            <span className="text-[10px] text-highlight">
              {deadline?.toString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div onClick={toggleDone}>{isDone ? <Uncheck /> : <Check />}</div>
            <button onClick={handleDeleteTask}>
              <IconTrash />
            </button>
          </div>
        </div>
      </div>

      <Modal
        children={<TaskModalComponent />}
        isOpen={isModalOpen}
        onClose={toggleModal}
      />
    </div>
  );
};
