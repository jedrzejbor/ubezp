import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import Brightness7RoundedIcon from '@mui/icons-material/Brightness7Rounded';
import { Box, Container, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { useColorMode } from '@/theme';

const AuthLayout = () => {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <Box
      component="main"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
      py={4}
      sx={(theme) => ({
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #f3f4f6 0%, #ffffff 40%, #e0e7ff 100%)'
            : 'linear-gradient(135deg, #111827 0%, #0b1224 50%, #111827 100%)'
      })}
    >
      <Container maxWidth="sm">
        <Paper
          variant="outlined"
          sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, borderColor: 'divider' }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <div>
              <Typography variant="overline" color="text.secondary" fontWeight={700}>
                Ubezp.pl
              </Typography>
              <Typography variant="h5" component="h1">
                Strefa logowania
              </Typography>
            </div>
            <IconButton
              aria-label="Przełącz motyw"
              onClick={toggleColorMode}
              color="primary"
              size="large"
            >
              {mode === 'light' ? <Brightness4RoundedIcon /> : <Brightness7RoundedIcon />}
            </IconButton>
          </Stack>

          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
