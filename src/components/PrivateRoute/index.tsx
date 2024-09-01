import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const PrivateRoute = () => {
  const { currentUser, isEmailVerified } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!isEmailVerified) {
    return <Navigate to="/verify-email" />;
  }

  return <Outlet />;
};
