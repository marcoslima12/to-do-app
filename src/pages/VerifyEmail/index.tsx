import React from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

export const VerifyEmail: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleResendEmail = async () => {
    try {
      await sendEmailVerification(currentUser!);
      toast.success("Email reenviado com sucesso!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
        className: "rounded shadow-lg text-white bg-secondary text-sm",
      });
    } catch (err) {
      console.error("Erro ao reenviar email de verificação", err);
      toast.error("O email não pôde ser reenviado. Tente de novo!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
        className: "rounded shadow-lg text-white bg-secondary text-sm",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-terciary flex items-center justify-center">
        <div className="bg-primary flex flex-col items-center justify-center text-white rounded-lg shadow-lg w-11/12 md:w-3/5 max-w-lg p-4 text-center">
          <h1 className="text-2xl font-bold text-highlight">
            Verifique seu email
          </h1>
          <p className="mt-4">
            Um email de verificação foi enviado para{" "}
            <span className="text-highlight">{currentUser?.email}</span>.
          </p>
          <p className="mt-2">Por favor, verifique seu email para continuar.</p>
          <div className="mt-4 flex gap-2 items-center">
            Ainda não recebeu?{" "}
            <span
              className="text-white rounded underline cursor-pointer"
              onClick={handleResendEmail}
            >
              Reenviar o email
            </span>
          </div>
          <div>
            Já verificou seu email?{" "}
            <span
              onClick={() =>  navigate("/login")}
              className="text-white rounded underline cursor-pointer"
            >
              Entrar
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
