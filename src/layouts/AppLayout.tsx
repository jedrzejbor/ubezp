import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import AppShell from '@/components/layout/AppShell';
import { useAuthStore } from '@/store/authStore';

const navItems = [
  { label: 'Panel główny', to: '/app', icon: <DashboardRoundedIcon fontSize="small" /> },
  { label: 'Konto', to: '/konto', icon: <ManageAccountsRoundedIcon fontSize="small" /> }
];

const AppLayout = () => {
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    resetAuth();
    navigate('/login', { replace: true });
  };

  return (
    <AppShell navItems={navItems} onLogout={handleLogout}>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </AppShell>
  );
};

export default AppLayout;
