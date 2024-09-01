import { useNavigate } from "react-router-dom";
import { ProfileLogo } from "../../assets";
import { useAuth } from "../../contexts/AuthContext";
import { logOut } from "../../services/auth";
import { Logout } from "../IconLogout";
import { Modal } from "../Modals/DefaultModal";
import { useState } from "react";
import { MediumLogo } from "../MediumLogo";

export const Sidebar = () => {
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

  const [logOutModal, setLogOutModal] = useState(false);
  const handleOpenModalLogout = () => setLogOutModal(true);
  const handleCloseModalLogout = () => setLogOutModal(false);

  const LogoutComponent = () => {
    return <span className="text-white">Você realmente deseja sair?</span>;
  };

  return (
    <div className=" fixed w-80 hidden lg:flex h-full bg-secondary text-white flex-col pt-28 pb-8 px-5">
      <div className="h-full flex flex-col gap-5">
        <img
          className="w-[100px]"
          src={ProfileLogo}
          alt="Default image for profile"
        />
        <h1 className="font-bold text-xl text-white">
          Olá, {currentUser?.displayName}!
        </h1>
        <button className="flex gap-2" onClick={handleOpenModalLogout}>
          Sair <Logout />
        </button>
      </div>

      <div className="flex gap-6">
        <MediumLogo />
        <div className="flex flex-col justify-around items-start">
          <span>dot it!</span>
          seu to do app favorito!
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
    </div>
  );
};
