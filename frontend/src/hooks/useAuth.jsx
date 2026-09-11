import { useAuthContext } from '../contexts/AuthContext.jsx';

export const useAuth = () => {
  const authContext = useAuthContext();
  return {
    ...authContext,
    canAccess: (requiredRole = null) => {
      if (!authContext.isAuthenticated) return false;
      if (!requiredRole) return true;
      return authContext.user?.role === requiredRole;
    }
  };
};
