import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

interface PasswordResetSentProps {
  onBackToLogin?: () => void;
}

export const PasswordResetSent: React.FC<PasswordResetSentProps> = ({ onBackToLogin }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: isMobile ? 343 : 420,
        mx: 'auto'
      }}
    >
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
          <MailOutlineRoundedIcon sx={{ fontSize: 36, color: '#8F6D5F' }} />
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
            Wiadomość wysłana
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
            Na Twój adres e-mail została wysłana wiadomość zawierająca link resetujący hasło.
            Kliknij w link otrzymany w wiadomości.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: '12px',
              lineHeight: 1.66,
              letterSpacing: '0.4px',
              color: 'rgba(0, 0, 0, 0.6)',
              mt: 2
            }}
          >
            Jeśli nie możesz odnaleźć tego e-maila, w pierwszej kolejności upewnij się, że
            sprawdziłeś spam.
          </Typography>
        </Stack>

        {/* Back button */}
        <Button
          variant="contained"
          fullWidth
          onClick={onBackToLogin}
          sx={{
            bgcolor: '#1E1F21',
            color: '#FFFFFF',
            py: 1.25,
            fontSize: '14px',
            fontWeight: 500,
            mt: 2,
            '&:hover': { bgcolor: '#32343A' }
          }}
        >
          Zaloguj się
        </Button>
      </Stack>
    </Box>
  );
};

export default PasswordResetSent;
