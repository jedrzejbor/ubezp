import { createBrowserRouter, Navigate } from 'react-router-dom';

import AccountPage from '@/pages/AccountPage';
import DashboardPage from '@/pages/DashboardPage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AppErrorBoundary from '@/routes/AppErrorBoundary';
import ProtectedRoute from '@/routes/ProtectedRoute';
import AppLayout from '@/layouts/AppLayout';
import AuthLayout from '@/layouts/AuthLayout';
import { useAuthStore } from '@/store/authStore';

// eslint-disable-next-line react-refresh/only-export-components
const LandingRedirect = () => {
  const token = useAuthStore((state) => state.token);

  return <Navigate to={token ? '/app' : '/login'} replace />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingRedirect />,
    errorElement: <AppErrorBoundary />
  },
  {
    element: <AuthLayout />,
    errorElement: <AppErrorBoundary />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/reset-password',
        element: <LoginPage initialStage="forgot" />
      }
    ]
  },
  {
    element: <AppLayout />,
    errorElement: <AppErrorBoundary />,
    children: [
      {
        path: '/app',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/konto',
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);
