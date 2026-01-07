import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@/utils/formSchemas';
import { mockLogin } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

export interface LoginFormProps {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  onBecomeClient?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onForgotPassword,
  onBecomeClient
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const { setToken, setUser, setLoading, loading, setError, clearError } = useAuthStore();
  const { addToast } = useUiStore();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    clearError();
    try {
      const response = await mockLogin(data.email, data.password);
      setToken(response.token);
      setUser(response.user);
      addToast({ id: crypto.randomUUID(), message: 'Zalogowano pomyślnie', severity: 'success' });
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nieznany błąd';
      setError(message);
      addToast({ id: crypto.randomUUID(), message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={2.5}
    >
      <Stack spacing={0.5}>
        <Typography variant="h3" component="h1">
          Witaj!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Zaloguj się do platformy i bądź na bieżąco z wszystkimi informacjami.
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register('email')}
        />

        <TextField
          label="Hasło"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                  {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Box display="flex" justifyContent="flex-end">
          <Link
            component="button"
            type="button"
            onClick={onForgotPassword}
            sx={{ color: 'secondary.main' }}
          >
            Nie pamiętam hasła
          </Link>
        </Box>
      </Stack>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={loading}
        startIcon={loading ? <CircularProgress size={18} color="inherit" /> : undefined}
      >
        Zaloguj się
      </Button>

      <Stack spacing={1} alignItems="center">
        <Typography variant="body2" color="text.secondary">
          Nie masz jeszcze konta?
        </Typography>
        <Button variant="outlined" onClick={onBecomeClient} fullWidth>
          Chcę zostać klientem Cliffside Brokers
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
