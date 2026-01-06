import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import { Avatar, Card, CardContent, Stack, Typography, Chip } from '@mui/material';

import { useAuthStore } from '@/store/authStore';

const AccountPage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ width: 56, height: 56 }}>
          <ManageAccountsRoundedIcon />
        </Avatar>
        <div>
          <Typography variant="h5" component="h1">
            Dane konta
          </Typography>
          <Typography color="text.secondary">
            {user?.name || 'Użytkownik demo'} · {user?.email || 'demo@ubezp.pl'}
          </Typography>
        </div>
      </Stack>

      <Card variant="outlined">
        <CardContent>
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <ShieldRoundedIcon color="primary" />
              <Typography variant="h6">Uprawnienia</Typography>
            </Stack>
            <Typography color="text.secondary">
              Dostęp do obszaru klienta chroniony jest tokenem przechowywanym w Zustand.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="Panel klienta" color="primary" variant="outlined" />
              <Chip label="Polisy" color="primary" variant="outlined" />
              <Chip label="Zgłoszenia" color="primary" variant="outlined" />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AccountPage;
