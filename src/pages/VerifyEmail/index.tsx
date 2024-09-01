import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification, reload } from "firebase/auth";
import { logOut } from "../../services/auth";
import useAuth from "../../hooks/useAuth";

export const VerifyEmail: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [, setChecking] = useState(false);

  const handleResendEmail = async () => {
    try {
      await sendEmailVerification(currentUser!);
      alert("Email de verificação reenviado!");
    } catch (err) {
      console.error("Erro ao reenviar email de verificação", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const checkEmailVerified = async () => {
    setChecking(true);
    await reload(currentUser!);
    if (currentUser?.emailVerified) {
      navigate("/home");
    }
    setChecking(false);
  };

  useEffect(() => {
    const intervalId = setInterval(checkEmailVerified, 2000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, navigate]);

  return (
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
        <p className="mt-4 flex gap-2 items-center">
          Não recebeu o email?{" "}
          <span
            className="text-white rounded underline cursor-pointer"
            onClick={handleResendEmail}
          >
            Reenvie o email
          </span>
          ou
          <span
            onClick={handleLogout}
            className="text-white rounded underline cursor-pointer"
          >
            Faça logout
          </span>
        </p>
      </div>
    </div>
  );
};
