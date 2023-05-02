import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { UserRole, getUserAuthData, getUserRoles } from '@/entities/User';
import { RoutePaths } from '@/shared/const/router';

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}

// Защищенные роуты

export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const useRoles = useSelector(getUserRoles);

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }
    return roles.some((requiredRole) => {
      const hasRole = useRoles?.includes(requiredRole);
      return hasRole;
    });
  }, [roles, useRoles]);

  if (!auth) {
    return <Navigate to={RoutePaths.main} state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return <Navigate to={RoutePaths.forbidden} state={{ from: location }} replace />;
  }

  return children;
};