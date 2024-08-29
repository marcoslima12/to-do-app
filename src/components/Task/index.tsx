import { useState } from "react";
import { IconTrash } from "../IconTrash";
import { Check } from "../Check";

interface Props {
  title: string;
  desc?: string;
  deadline?: Date;
}

export const Task = ({ desc = "", title, deadline }: Props) => {
  const [isDone, setIsDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDone = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique no checkbox abra o modal
    setIsDone(!isDone);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleDeleteTask = () => {
    console.log("Delete task\n");
  };

  return (
    <div>
      <div
        onClick={toggleModal}
        className={`w-full bg-primary p-4 flex flex-col gap-2 my-4 rounded cursor-pointer transition-opacity duration-300 ${
          isDone ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-4/5">
            <span className="text-sm text-highlight">{title}</span>

            <div
              className={`text-xs font-white line-clamp-2 overflow-hidden transition-all duration-500`}
            >
              {desc}
            </div>

            <span className="text-[10px] text-highlight">
              {deadline?.toLocaleDateString("pt-BR")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div onClick={toggleDone}>
              <Check  />
            </div>
            <button onClick={handleDeleteTask}>
              <IconTrash />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-quaternary bg-opacity-50 flex justify-center items-center">
          <div className="bg-primary p-6 rounded shadow-lg shadow-terciary w-4/5">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <p className="text-sm mb-4">{desc}</p>
            <p className="text-xs text-highlight mb-4">
              Deadline: {deadline?.toLocaleDateString("pt-BR")}
            </p>
            <div className="flex justify-end">
              <button
                onClick={toggleModal}
                className="bg-secondary text-white py-2 px-4 rounded hover:bg-highlight transition-all durantion-500"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
