import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Button, Card, CardContent, Chip, Stack, Typography, useTheme } from '@mui/material';
import PageTitle from '@/components/PageTitle';
import { useAuthStore } from '@/store/authStore';

const SettingsPage = () => {
  const theme = useTheme();
  const user = useAuthStore((state) => state.user);

  // Mock user data for display (replace with real data from your auth store or API)
  const userData = {
    firstName: user?.name?.split(' ')[0] || 'Joanna',
    lastName: user?.name?.split(' ')[1] || 'Kowalska',
    position: 'Super Admin CB',
    status: 'Aktywny',
    phone: '+48 123 123 123',
    email: user?.email || 'joannakowalska@cliffsiderokers.com'
  };

  const handleEdit = () => {
    // TODO: Open edit dialog/form
    console.log('Edit account details');
  };

  const handleChangePassword = () => {
    // TODO: Open password change dialog/form
    console.log('Change password');
  };

  return (
    <Stack
      spacing={2}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        py: 2,
        px: 1
      }}
    >
      {/* Page Title */}
      <PageTitle sx={{ mb: 0 }}>Szczegóły konta</PageTitle>

      {/* Account Data Section */}
      <Card
        sx={{
          borderRadius: 1,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)'
        }}
      >
        <CardContent
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: theme.palette.divider,
            borderRadius: 1
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              mb: 3,
              height: '67px',
              backgroundColor: '#FBF9F9',
              display: 'flex',
              alignItems: 'center',
              px: 2
            }}
          >
            Dane konta:
          </Typography>

          <Stack spacing={2.5} sx={{ px: 1.5 }}>
            {/* First Name */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                Imię
              </Typography>
              <Typography variant="body3">{userData.firstName}</Typography>
            </Stack>

            {/* Last Name */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                Nazwisko
              </Typography>
              <Typography variant="body3">{userData.lastName}</Typography>
            </Stack>

            {/* Position */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                Stanowisko
              </Typography>
              <Typography variant="body3">{userData.position}</Typography>
            </Stack>

            {/* Status */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                Status
              </Typography>
              <Chip
                label={userData.status}
                size="small"
                sx={{
                  bgcolor: '#E8F5E9',
                  color: '#2E7D32',
                  fontWeight: 400,
                  fontSize: '12px',
                  padding: '3px 8px',
                  '& .MuiChip-icon': { mr: '6px', ml: 0 },
                  '& .MuiChip-label': { px: 0 }
                }}
                icon={
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#4CAF50'
                    }}
                  />
                }
              />
            </Stack>

            {/* Phone */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                Telefon
              </Typography>
              <Typography variant="body3">{userData.phone}</Typography>
            </Stack>

            {/* Email */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                E-mail
              </Typography>
              <Typography variant="body3">{userData.email}</Typography>
            </Stack>
          </Stack>

          {/* Edit Button */}
          <Box sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              onClick={handleEdit}
              sx={{ borderRadius: 1 }}
            >
              Edytuj
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Password Settings Section */}
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid',
          borderColor: theme.palette.divider
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              mb: 3,
              height: '67px',
              backgroundColor: 'rgba(143, 109, 95, 0.04)',
              display: 'flex',
              alignItems: 'center',
              px: 2
            }}
          >
            Ustawienia hasła:
          </Typography>

          <Stack spacing={2.5} sx={{ px: 1.5 }}>
            {/* Password (masked) */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Hasło
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, letterSpacing: 2 }}>
                ***********
              </Typography>
            </Stack>
          </Stack>

          {/* Change Password Button */}
          <Box sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              onClick={handleChangePassword}
              sx={{ borderRadius: 1 }}
            >
              Zmiana hasła
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default SettingsPage;
