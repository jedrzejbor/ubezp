import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

/**
 * Strona pośrednia dla linków z maila w formacie: /reset/TOKEN&email=EMAIL
 * Parsuje token i email, następnie przekierowuje do /reset-password?token=TOKEN&email=EMAIL
 */
export const ResetPasswordTokenPage = () => {
  const { token } = useParams<{ token: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // Parsuj token i email - backend wysyła w formacie: /reset/TOKEN&email=EMAIL
    // Musimy wyciągnąć email z "tokena" który zawiera &email=...
    const parts = token.split('&email=');
    const actualToken = parts[0];
    const email = parts[1] || '';

    if (!email) {
      // Jeśli nie ma email w tokenie, spróbuj go wyciągnąć z query string
      const searchParams = new URLSearchParams(location.search);
      const emailFromQuery = searchParams.get('email');

      if (emailFromQuery) {
        navigate(`/reset-password?token=${actualToken}&email=${emailFromQuery}`, { replace: true });
      } else {
        navigate('/login');
      }
    } else {
      // Przekieruj do /reset-password z prawidłowymi query params
      navigate(`/reset-password?token=${actualToken}&email=${email}`, { replace: true });
    }
  }, [token, location.search, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default ResetPasswordTokenPage;
