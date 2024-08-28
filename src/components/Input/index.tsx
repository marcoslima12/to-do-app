import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

export const Input = ({
  id,
  label,
  type,
  error,
  register,
}: InputFieldProps) => {
  return (
    <div className="w-full">
      <label className="text-white text-lg font-bold lg:text-xl" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register}
        className={`box-border w-full px-3 py-2 mt-4 mb-2 text-sm bg-primary text-white rounded shadow focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && (
        <p className="text-red-500 text-xs italic mb-2">{error.message}</p>
      )}
    </div>
  );
};
