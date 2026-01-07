import { Box, Container, IconButton, Paper, Stack, useTheme } from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BrandLogo from '@/components/BrandLogo';
import { useColorMode } from '@/theme';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const { toggleColorMode, mode } = useColorMode();

  const isLight = theme.palette.mode === 'light';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isLight
          ? 'linear-gradient(180deg, #FFFFFF 0%, #F5F3EF 100%)'
          : 'linear-gradient(180deg, #0E1117 0%, #0C0F14 100%)',
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative'
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ display: 'flex', flexDirection: 'column', py: { xs: 6, md: 8 } }}
      >
        <Stack direction="row" justifyContent="flex-end" mb={3}>
          <IconButton
            aria-label="Przełącz motyw"
            onClick={toggleColorMode}
            color="inherit"
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper'
            }}
          >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
          </IconButton>
        </Stack>

        <Stack spacing={3} alignItems="center" justifyContent="center" flex={1}>
          <Stack spacing={2} alignItems="center">
            <BrandLogo size="lg" />
          </Stack>

          <Paper
            variant="outlined"
            sx={{
              width: '100%',
              p: '40px 16px 32px',
              boxShadow: isLight
                ? '0px 14px 46px rgba(23, 26, 31, 0.06)'
                : '0px 14px 46px rgba(0, 0, 0, 0.48)'
            }}
          >
            {children}
          </Paper>
        </Stack>

        {/* <Stack direction="row" spacing={1.5} justifyContent="center" mt={4} color="text.secondary">
          <Typography variant="body2" component="span">
            Regulaminy
          </Typography>
          <Typography variant="body2" component="span">
            |
          </Typography>
          <Typography variant="body2" component="span">
            Polityka prywatności
          </Typography>
        </Stack>

        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          mt={1.5}
          sx={{ letterSpacing: '0.02em' }}
        >
          Copyright © 2024 Cliffsidebrokers
        </Typography> */}
      </Container>
    </Box>
  );
};

export default AuthLayout;
