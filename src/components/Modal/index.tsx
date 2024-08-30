import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input";
import { Button } from "../Button";
import { Close } from "../Close";

const schema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  desc: z.string().optional(),
  deadline: z.date({
    required_error: "Deadline é obrigatório",
    invalid_type_error: "Data inválida"
  }),
});

type TaskFormData = z.infer<typeof schema>;

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm<TaskFormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
    reset(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 flex justify-center items-center">
      <div className="bg-terciary p-6 rounded-lg shadow-lg w-11/12 md:w-3/5 max-w-lg relative">
        <button
          className="absolute top-4 right-4"
          onClick={onClose}
          aria-label="Close"
        >
          <Close />
        </button>
        <h2 className="text-xl mb-4 text-highlight">Criar tarefa</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <Input
              id="title"
              label="Título"
              type="text"
              error={errors.title}
              register={register("title")}
              placeholder="Título"
              required
            />
          </div>
          <div className="mb-4">
            <Input
              id="desc"
              label="Descrição"
              type="text"
              error={errors.desc}
              register={register("desc")}
              placeholder="Descrição"
            />
          </div>
          <div className="mb-4 ">
            <Input
              id="date"
              label="Deadline"
              type="date"
              error={errors.deadline}
              register={{
                ...register("deadline", {
                  valueAsDate: true,
                }),
              }}
              placeholder="Data"
              required
            />
          </div>
          <div className="flex gap-4">
            <Button text="Cancelar" type="button" onClick={onClose} />
            <Button text="Adicionar" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
