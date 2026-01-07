import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NightlightRoundRoundedIcon from '@mui/icons-material/NightlightRoundRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import React from 'react';
import BrandLogo from '@/components/BrandLogo';
import { useColorMode } from '@/theme';
import { useAuthStore } from '@/store/authStore';

const drawerWidth = 260;

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = React.useState(false);
  const { toggleColorMode, mode } = useColorMode();
  const { user, resetAuth } = useAuthStore();

  const toggleDrawer = () => setOpen((prev) => !prev);

  const navItems = [
    {
      label: 'Panel główny',
      icon: <DashboardRoundedIcon fontSize="small" />
    }
  ];

  const drawerContent = (
    <Stack height="100%">
      <Stack direction="row" alignItems="center" spacing={1.5} p={3}>
        <BrandLogo size="sm" />
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ letterSpacing: '0.08em' }}>
            Cliffside
          </Typography>
          <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
            Brokers
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <List sx={{ px: 1 }}>
        {navItems.map((item) => (
          <ListItemButton key={item.label} selected sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Box flex={1} />
      <Divider />
      <Stack direction="row" alignItems="center" spacing={1.5} p={3}>
        <Avatar
          sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', width: 42, height: 42 }}
        >
          {user?.name?.[0] ?? 'C'}
        </Avatar>
        <Box>
          <Typography variant="subtitle1">{user?.name ?? 'Gość'}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email ?? 'brak danych'}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          ml: isMdUp ? `${drawerWidth}px` : 0,
          width: isMdUp ? `calc(100% - ${drawerWidth}px)` : '100%'
        }}
      >
        <Toolbar sx={{ display: 'flex', gap: 1.5 }}>
          {!isMdUp && (
            <IconButton edge="start" onClick={toggleDrawer} aria-label="Otwórz nawigację">
              <MenuRoundedIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flex: 1 }}>
            Panel klienta
          </Typography>
          <Tooltip title="Przełącz motyw">
            <IconButton onClick={toggleColorMode} color="primary">
              {mode === 'light' ? <NightlightRoundRoundedIcon /> : <WbSunnyRoundedIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Wyloguj">
            <IconButton color="primary" onClick={resetAuth}>
              <LogoutRoundedIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMdUp ? 'permanent' : 'temporary'}
        open={isMdUp ? true : open}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }
        }}
      >
        {drawerContent}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 4 }, mt: 8, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default AppShell;
