import MailRoundedIcon from '@mui/icons-material/MailRounded';
import { Button, Stack, TextField, Typography, Alert } from '@mui/material';
import { FormEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Stack component="form" spacing={3} onSubmit={handleSubmit} noValidate>
      <Stack spacing={1}>
        <Typography variant="h6" component="h2">
          Reset hasła
        </Typography>
        <Typography color="text.secondary">
          Podaj adres e-mail, a wyślemy link do ustawienia nowego hasła.
        </Typography>
      </Stack>

      <TextField
        required
        fullWidth
        label="Adres e-mail"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      {submitted && (
        <Alert severity="success">
          Jeśli konto istnieje, instrukcje resetu zostały wysłane na {email || 'podany adres'}.
        </Alert>
      )}

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<MailRoundedIcon />}
          fullWidth
          sx={{ py: 1.2 }}
        >
          Wyślij link
        </Button>
        <Button component={RouterLink} to="/login">
          Wróć do logowania
        </Button>
      </Stack>
    </Stack>
  );
};

export default ResetPasswordPage;
