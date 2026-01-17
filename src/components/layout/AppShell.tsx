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
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import BrandLogo from '@/components/BrandLogo';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';
import { useColorMode } from '@/theme';
import { useAuthStore } from '@/store/authStore';

const drawerWidth = 260;

interface AppShellProps {
  children: React.ReactNode;
  navItems: { label: string; icon: React.ReactNode; to: string }[];
  onLogout?: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({ children, navItems, onLogout }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [accountDrawerOpen, setAccountDrawerOpen] = React.useState(false);
  const { toggleColorMode, mode } = useColorMode();
  const { user, resetAuth } = useAuthStore();

  const toggleDrawer = () => setOpen((prev) => !prev);
  const toggleAccountDrawer = () => setAccountDrawerOpen((prev) => !prev);

  const handleLogout = () => {
    resetAuth();
    setAccountDrawerOpen(false);
    onLogout?.();
  };

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
        {navItems.map((item) => {
          const active = location.pathname.startsWith(item.to);
          return (
            <ListItemButton
              key={item.label}
              component={NavLink}
              to={item.to}
              selected={active}
              onClick={() => {
                if (!isMdUp) {
                  setOpen(false);
                }
              }}
              sx={{
                borderRadius: 2,
                '&.active': { bgcolor: 'action.selected' }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ sx: { fontSize: '14px', fontWeight: 500 } }}
              />
            </ListItemButton>
          );
        })}
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
        <Toolbar sx={{ display: 'flex', gap: 1.5, justifyContent: 'space-between' }}>
          {isMdUp ? (
            <>
              {/* Desktop: hamburger removed, title and actions */}
              <Typography variant="h6" sx={{ flex: 1 }}>
                Panel klienta
              </Typography>
              <Tooltip title="Przełącz motyw">
                <IconButton onClick={toggleColorMode} color="primary">
                  {mode === 'light' ? <NightlightRoundRoundedIcon /> : <WbSunnyRoundedIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Wyloguj">
                <IconButton color="primary" onClick={handleLogout}>
                  <LogoutRoundedIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              {/* Mobile: clickable logo + avatar */}
              <IconButton
                component={NavLink}
                to="/app/dashboard"
                edge="start"
                aria-label="Dashboard"
                sx={{ p: 0.5 }}
              >
                <BrandLogo size="sm" />
              </IconButton>
              <Box flex={1} />
              <IconButton edge="end" onClick={toggleAccountDrawer} aria-label="Konto">
                <Avatar
                  sx={{
                    bgcolor: 'secondary.main',
                    color: 'secondary.contrastText',
                    width: 40,
                    height: 40
                  }}
                >
                  {user?.name?.[0] ?? 'C'}
                </Avatar>
              </IconButton>
            </>
          )}
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

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 4 }, mt: 8, mb: 8, width: '100%' }}>
        {children}
      </Box>

      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* Mobile Account Drawer (bottom sheet) */}
      {!isMdUp && (
        <Drawer
          anchor="bottom"
          open={accountDrawerOpen}
          onClose={toggleAccountDrawer}
          sx={{
            '& .MuiDrawer-paper': {
              borderRadius: '16px 16px 0 0',
              backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#1A1B1F',
              p: 3
            }
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'secondary.contrastText',
                  width: 48,
                  height: 48
                }}
              >
                {user?.name?.[0] ?? 'C'}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={500}>
                  {user?.name ?? 'Gość'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email ?? 'brak danych'}
                </Typography>
              </Box>
            </Stack>

            <Divider />

            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LogoutRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Wyloguj" />
            </ListItemButton>
          </Stack>
        </Drawer>
      )}
    </Box>
  );
};

export default AppShell;
