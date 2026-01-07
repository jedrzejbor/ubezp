import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/utils/formSchemas';
import { mockRequestPasswordReset } from '@/services/authService';
import { useUiStore } from '@/store/uiStore';

interface ForgotPasswordFormProps {
  onBackToLogin?: () => void;
  onProceed?: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin,
  onProceed
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema) });

  const { addToast } = useUiStore();
  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      const res = await mockRequestPasswordReset(data.email);
      addToast({ id: crypto.randomUUID(), message: res.message, severity: 'success' });
      onProceed?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nieznany błąd';
      addToast({ id: crypto.randomUUID(), message, severity: 'error' });
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
          Reset hasła
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Podaj adres e-mail, na który wyślemy instrukcje resetu.
        </Typography>
      </Stack>

      <TextField
        label="E-mail"
        type="email"
        autoComplete="email"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        {...register('email')}
      />

      <Alert severity="info" variant="outlined" sx={{ borderRadius: 2, borderColor: 'divider' }}>
        Na kolejny etap resetu dodaliśmy placeholder. Po otrzymaniu kodu wprowadź go, aby ustawić
        nowe hasło.
      </Alert>

      <Stack spacing={2}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : undefined}
        >
          Wyślij instrukcje
        </Button>
        <Link
          component="button"
          type="button"
          onClick={onBackToLogin}
          sx={{ color: 'secondary.main' }}
        >
          Powrót do logowania
        </Link>
      </Stack>
    </Box>
  );
};

export default ForgotPasswordForm;
