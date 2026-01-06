import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { Button, Stack, TextField, Typography, Link as MuiLink } from '@mui/material';
import { FormEvent, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate, type Location } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const location = useLocation();
  const navigate = useNavigate();

  const from = (location.state as { from?: Location })?.from?.pathname || '/app';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUser({ id: 'demo-user', name: 'Jan Kowalski', email });
    setToken('demo-token');
    navigate(from, { replace: true });
  };

  return (
    <Stack component="form" spacing={3} onSubmit={handleSubmit} noValidate>
      <Stack spacing={1}>
        <Typography variant="h6" component="h2">
          Zaloguj się
        </Typography>
        <Typography color="text.secondary">
          Użyj danych testowych, aby uzyskać dostęp do panelu demo.
        </Typography>
      </Stack>

      <TextField
        required
        fullWidth
        label="Adres e-mail"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
      />
      <TextField
        required
        fullWidth
        label="Hasło"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="current-password"
      />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<LockRoundedIcon />}
          fullWidth
          sx={{ py: 1.2 }}
        >
          Zaloguj
        </Button>
        <MuiLink component={RouterLink} to="/reset-password" underline="hover">
          Zapomniałeś hasła?
        </MuiLink>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
