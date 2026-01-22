import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  //   Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import BrandLogo from '@/components/BrandLogo';

export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  to: string;
}

export interface MenuSection {
  items: MenuItem[];
}

interface DesktopSidebarProps {
  sections: MenuSection[];
  onCollapsedChange?: (collapsed: boolean) => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ sections, onCollapsedChange }) => {
  const theme = useTheme();
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onCollapsedChange?.(newCollapsed);
  };

  const sidebarWidth = collapsed ? 80 : 260;

  return (
    <Box
      sx={{
        width: sidebarWidth,
        height: 'calc(100vh - 48px)',
        position: 'fixed',
        left: '24px',
        top: '24px',
        bgcolor: '#1E1F21',
        backdropFilter: 'blur(2px)',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        py: 4,
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        zIndex: theme.zIndex.drawer
      }}
    >
      {/* Logo */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{
          px: collapsed ? 2 : 4,
          justifyContent: collapsed ? 'center' : 'flex-start',
          minHeight: 70
        }}
      >
        <BrandLogo size="sm" />
      </Stack>

      {/* Divider */}
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

      {/* Menu Sections */}
      <Stack
        spacing={3}
        sx={{
          px: collapsed ? 0 : 1.5,
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px'
          }
        }}
      >
        {sections.map((section, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            {sectionIndex > 0 && (
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', mx: collapsed ? 2 : 0 }} />
            )}
            <List sx={{ p: 0 }}>
              {section.items.map((item) => {
                const active = location.pathname.startsWith(item.to);
                return (
                  <ListItemButton
                    key={item.to}
                    component={NavLink}
                    to={item.to}
                    selected={active}
                    sx={{
                      borderRadius: 1,
                      px: collapsed ? 2 : 2,
                      py: 1.25,
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      minHeight: 44,
                      color: '#9E9E9E',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(143, 109, 95, 0.08)',
                        color: '#8F6D5F'
                      },
                      '&.Mui-selected': {
                        bgcolor: 'rgba(143, 109, 95, 0.12)',
                        color: '#8F6D5F',
                        '&:hover': {
                          bgcolor: 'rgba(143, 109, 95, 0.16)'
                        }
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: collapsed ? 'auto' : 40,
                        color: 'inherit',
                        justifyContent: 'center'
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        sx={{ my: 0 }}
                        primary={item.label}
                        primaryTypographyProps={{
                          sx: {
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: 1.43,
                            letterSpacing: '0.17px',
                            color: 'inherit'
                          }
                        }}
                      />
                    )}
                  </ListItemButton>
                );
              })}
            </List>
          </React.Fragment>
        ))}

        {/* Collapse Toggle Button at Bottom */}
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', mb: 2 }} />
          <ListItemButton
            onClick={toggleCollapsed}
            sx={{
              borderRadius: 1,
              px: collapsed ? 2 : 2,
              py: 1.25,
              justifyContent: collapsed ? 'center' : 'flex-start',
              minHeight: 44,
              color: '#9E9E9E',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(143, 109, 95, 0.08)',
                color: '#8F6D5F'
              }
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: collapsed ? 'auto' : 40,
                color: 'inherit',
                justifyContent: 'center'
              }}
            >
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                sx={{ my: 0 }}
                primary="Zwiń menu"
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: 1.43,
                    letterSpacing: '0.17px',
                    color: 'inherit'
                  }
                }}
              />
            )}
          </ListItemButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default DesktopSidebar;
