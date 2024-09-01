import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  placeholder?: string;
  required?: boolean;
}

export const Input = ({
  id,
  label,
  type,
  error,
  register,
  placeholder = "",
  required = false
}: InputFieldProps) => {
  return (
    <div className="w-full">
      <label className="text-white text-md font-bold lg:text-xl" htmlFor={id}>
        {label} {required && (
          <span className="text-highlight ml-1">*</span>
        )}
      </label>
      <input
        className={`box-border w-full px-3 py-2 mt-4 mb-2 text-sm bg-primary text-white rounded shadow focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
        type={type}
        id={id}
        {...register}
      />
      {error && (
        <p className="text-red-500 text-xs italic mb-2">{error.message}</p>
      )}
    </div>
  );
};
