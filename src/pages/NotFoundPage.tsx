import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';

const NotFoundPage = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <Box
      component="main"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <Paper variant="outlined" sx={{ maxWidth: 480, width: '100%', p: 4 }}>
        <Stack spacing={2} textAlign="center" alignItems="center">
          <SearchOffRoundedIcon color="disabled" fontSize="large" />
          <Typography variant="h5" component="h1">
            Nie znaleziono strony
          </Typography>
          <Typography color="text.secondary">
            Sprawdź, czy adres URL jest poprawny lub wróć do głównej sekcji aplikacji.
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={token ? '/app' : '/login'}
            fullWidth
            sx={{ maxWidth: 240 }}
          >
            Wróć do panelu
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;
