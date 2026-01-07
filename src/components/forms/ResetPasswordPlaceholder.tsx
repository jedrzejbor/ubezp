import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormValues } from '@/utils/formSchemas';
import { mockCompletePasswordReset } from '@/services/authService';
import { useUiStore } from '@/store/uiStore';

interface ResetPasswordPlaceholderProps {
  onBack?: () => void;
}

export const ResetPasswordPlaceholder: React.FC<ResetPasswordPlaceholderProps> = ({ onBack }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordFormValues>({ resolver: zodResolver(resetPasswordSchema) });

  const { addToast } = useUiStore();

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      const res = await mockCompletePasswordReset(data.code);
      addToast({ id: crypto.randomUUID(), message: res.message, severity: 'success' });
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
          Ustaw nowe hasło
        </Typography>
        <Typography variant="body1" color="text.secondary">
          W przyszłości ten krok zostanie zastąpiony integracją z backendem i ustawieniem nowego
          hasła.
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <TextField
          label="Kod resetujący"
          autoComplete="one-time-code"
          error={Boolean(errors.code)}
          helperText={errors.code?.message}
          {...register('code')}
        />

        <TextField
          label="Nowe hasło"
          type="password"
          autoComplete="new-password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password')}
        />

        <TextField
          label="Potwierdź hasło"
          type="password"
          autoComplete="new-password"
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </Stack>

      <Alert severity="warning" variant="outlined" sx={{ borderRadius: 2, borderColor: 'divider' }}>
        Placeholder dla etapu ustawiania hasła — docelowo zostanie podpięty backend.
      </Alert>

      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
          Zapisz nowe hasło
        </Button>
        <Button variant="outlined" onClick={onBack} fullWidth>
          Wróć
        </Button>
      </Stack>
    </Box>
  );
};

export default ResetPasswordPlaceholder;
