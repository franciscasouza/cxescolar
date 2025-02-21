// Authentication Guard
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';

export const AuthGuard = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>; // Or a loading component
  }

  return isAuthenticated 
    ? <Outlet /> 
    : <Navigate to={ROUTES.LOGIN} replace />;
};

export const GuestGuard = () => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated 
    ? <Outlet /> 
    : <Navigate to={ROUTES.HOME} replace />;
};
