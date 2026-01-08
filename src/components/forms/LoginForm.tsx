import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
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
  const theme = useTheme();

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
      // gap={2}
    >
      <Stack spacing={1} mb={3}>
        <Typography variant="h5" component="h1" sx={{ fontSize: '24px', fontWeight: 300 }}>
          Witaj!
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: '14px', fontWeight: 400 }}
          color="text.secondary"
        >
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
            sx={{ color: 'secondary.main', mt: '-4px', mb: '20px' }}
          >
            Nie pamiętam hasła
          </Link>
        </Box>
      </Stack>

      <Stack spacing={1} alignItems="center" sx={{ width: '100%' }}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : undefined}
          sx={{ height: 40, py: '8px', px: '22px' }}
        >
          Zaloguj się
        </Button>

        <Button
          variant="outlined"
          onClick={onBecomeClient}
          fullWidth
          sx={{ height: 40, py: '8px', px: '19px' }}
        >
          Chcę zostać klientem Cliffside Brokers
        </Button>
      </Stack>

      <Divider
        variant="middle"
        sx={{
          // width: 247,
          // height: '1px',
          borderColor: alpha(theme.palette.secondary.main, 0.12),
          mt: 4,
          mb: 2
        }}
      />
      <Stack direction="row" spacing={1.5} justifyContent="center" mt={0} color="text.secondary">
        <Link href="#" underline="hover" color="text.secondary" variant="body2">
          Regulaminy
        </Link>
        <Typography variant="body2" component="span">
          |
        </Typography>
        <Link href="#" underline="hover" color="text.secondary" variant="body2">
          Polityka prywatności
        </Link>
      </Stack>

      <Typography
        variant="caption"
        color="text.secondary"
        textAlign="center"
        mt={0.5}
        sx={{ letterSpacing: '0.02em' }}
      >
        Copyright © 2024 Cliffsidebrokers
      </Typography>
    </Box>
  );
};

export default LoginForm;
