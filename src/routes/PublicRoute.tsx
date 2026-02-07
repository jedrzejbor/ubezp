import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';

interface PublicRouteProps {
  children: ReactElement;
}

/**
 * PublicRoute — Protects auth pages (login, reset password, 2FA verification).
 * If user has a valid token, redirects to dashboard.
 * Otherwise, allows access to the auth page.
 */
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  // If user is already authenticated, redirect to dashboard
  if (token) {
    return <Navigate to="/app/dashboard" replace />;
  }

  // Otherwise, allow access to the auth page (login, reset password, etc.)
  return children;
};

export default PublicRoute;
