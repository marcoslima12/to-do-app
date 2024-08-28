import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { logOut } from "../../services/auth";
import { useEffect } from "react";

export const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login"); // Redireciona para a página de login após logout
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); // Se não houver usuário autenticado, redireciona para a página de login
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg  p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome, {currentUser?.displayName}
        </h1>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
