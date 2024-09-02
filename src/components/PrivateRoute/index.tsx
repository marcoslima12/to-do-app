import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const PrivateRoute = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
