import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const AppErrorBoundary = () => {
  const error = useRouteError();

  const renderMessage = () => {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'Wystąpił nieoczekiwany błąd.';
  };

  return (
    <Box
      component="main"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <Paper variant="outlined" sx={{ maxWidth: 520, width: '100%', p: 4 }}>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <ErrorOutlineRoundedIcon color="error" fontSize="large" />
          <Typography variant="h5" component="h1">
            Ups! Coś poszło nie tak
          </Typography>
          <Typography color="text.secondary">{renderMessage()}</Typography>
          <Button
            variant="contained"
            startIcon={<RefreshRoundedIcon />}
            onClick={() => window.location.reload()}
          >
            Odśwież stronę
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AppErrorBoundary;
