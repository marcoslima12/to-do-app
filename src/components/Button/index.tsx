import { CircularPogress } from "../CircularProgress";

interface Props {
  text: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  isSubmitting?: boolean;
}

export const Button = ({ isSubmitting, onClick, text, type }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={isSubmitting}
      type={type}
      className={`w-full custom-gradient hover:custom-gradient:hover transition-all duration-300 text-terciary text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center ${
        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isSubmitting ? <CircularPogress /> : text}
    </button>
  );
};
