import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import Brightness7RoundedIcon from '@mui/icons-material/Brightness7Rounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';
import { useColorMode } from '@/theme';

const AppLayout = () => {
  const { mode, toggleColorMode } = useColorMode();
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    resetAuth();
    navigate('/login', { replace: true });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <MenuRoundedIcon color="primary" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Panel klienta
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              color="primary"
              component={NavLink}
              to="/app"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              sx={{
                fontWeight: 600,
                '&.active': { color: 'primary.main' }
              }}
            >
              Start
            </Button>
            <Button
              color="primary"
              component={NavLink}
              to="/konto"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              sx={{
                fontWeight: 600,
                '&.active': { color: 'primary.main' }
              }}
            >
              Konto
            </Button>
          </Stack>
          <IconButton aria-label="Przełącz motyw" onClick={toggleColorMode} color="primary">
            {mode === 'light' ? <Brightness4RoundedIcon /> : <Brightness7RoundedIcon />}
          </IconButton>
          <IconButton aria-label="Wyloguj" onClick={handleLogout} color="primary">
            <LogoutRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box component="main" sx={{ flexGrow: 1, py: { xs: 3, md: 4 } }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AppLayout;
