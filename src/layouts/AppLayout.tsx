import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import AppShell from '@/components/layout/AppShell';
import { useAuthStore } from '@/store/authStore';

const navItems = [
  {
    label: 'Panel główny',
    to: '/app',
    icon: <DashboardOutlinedIcon sx={{ fontSize: 24, width: 24, height: 24 }} />
  },
  {
    label: 'Konto',
    to: '/konto',
    icon: <ManageAccountsOutlinedIcon sx={{ fontSize: 24, width: 24, height: 24 }} />
  }
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
