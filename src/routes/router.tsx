import { createBrowserRouter, Navigate } from 'react-router-dom';

import AccountPage from '@/pages/AccountPage';
import DashboardPage from '@/pages/DashboardPage';
import LoginPage from '@/pages/LoginPage';
import TwoFactorAuthPage from '@/pages/TwoFactorAuthPage';
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
      },
      {
        path: '/verify',
        element: <TwoFactorAuthPage />
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
        path: '/app/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/app/policies',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/app/claims',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/app/payments',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/app/documents',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/app/settings',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/app/support',
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
