import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/utils/formSchemas';
import { requestPasswordReset } from '@/services/authService';
// import { useUiStore } from '@/store/uiStore';

interface ForgotPasswordFormProps {
  onBackToLogin?: () => void;
  onProceed?: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin,
  onProceed
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema) });

  // const { addToast } = useUiStore();

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await requestPasswordReset({ email: data.email });
      // Zawsze pokazuj sukces (nawet jeśli konto nie istnieje - bezpieczeństwo)
      onProceed?.();
    } catch (error) {
      console.error('Błąd podczas żądania resetu hasła:', error);
      // Nawet przy błędzie pokazujemy sukces dla bezpieczeństwa
      // (nie ujawniamy czy email istnieje w systemie)
      onProceed?.();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: isMobile ? 343 : 420,
        mx: 'auto'
      }}
    >
      {/* Back button */}
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={onBackToLogin}
        sx={{
          position: 'absolute',
          alignSelf: 'flex-start',
          color: '#1E1F21',
          px: 1.5,
          mb: 4,
          mt: -2,
          top: '40px',
          left: '20px'
        }}
      >
        {isMobile ? 'Wróć' : 'Wróć do logowania'}
      </Button>

      <Stack spacing={3} alignItems="center">
        {/* Icon */}
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            bgcolor: 'rgba(143, 109, 95, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <LockOpenRoundedIcon sx={{ fontSize: 36, color: '#8F6D5F' }} />
        </Box>

        {/* Title & Description */}
        <Stack spacing={1} textAlign="center" sx={{ width: '100%', maxWidth: 311 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 300,
              fontSize: '24px',
              lineHeight: 1.334,
              color: '#32343A'
            }}
          >
            Reset hasła
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: '14px',
              lineHeight: 1.43,
              letterSpacing: '0.17px',
              color: 'rgba(0, 0, 0, 0.6)'
            }}
          >
            Wprowadź swój adres email, którego używasz w platformie Cliffsidebrokers lub numer
            telefonu, abyśmy mogli zidentyfikować Twoje konto.
          </Typography>
        </Stack>

        {/* Form fields */}
        <Stack spacing={3} sx={{ width: '100%', mt: 2 }}>
          <TextField
            label={isMobile ? 'E-mail/Telefon' : 'E-mail'}
            type="email"
            autoComplete="email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register('email')}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={{
              bgcolor: '#1E1F21',
              color: '#FFFFFF',
              py: 1.25,
              fontSize: '14px',
              fontWeight: 500,
              '&:hover': { bgcolor: '#32343A' }
            }}
          >
            Wyślij
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ForgotPasswordForm;
