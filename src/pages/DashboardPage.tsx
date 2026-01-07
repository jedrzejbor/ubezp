import { Grid, Paper, Stack, Typography, Skeleton, Box, Chip, Button } from '@mui/material';
import AppShell from '@/components/layout/AppShell';
import ToastStack from '@/components/ToastStack';
import { useEffect, useState } from 'react';
import { mockDashboardSummary, type DashboardSummary } from '@/services/authService';

const SummaryCard: React.FC<{ title: string; value?: string; loading?: boolean }> = ({
  title,
  value,
  loading
}) => (
  <Paper sx={{ p: 3, height: '100%' }}>
    <Stack spacing={1}>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      {loading ? (
        <Skeleton variant="rectangular" height={32} sx={{ borderRadius: 1 }} />
      ) : (
        <Typography variant="h4">{value}</Typography>
      )}
    </Stack>
  </Paper>
);

const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockDashboardSummary()
      .then(setSummary)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppShell>
      <Stack spacing={3}>
        <Box
          display="flex"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={1.5}
        >
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Witaj ponownie!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Podsumowanie Twojego konta i ostatnich aktywności.
            </Typography>
          </Box>
          <Box flex={1} />
          <Chip label="Nowość" color="secondary" variant="filled" />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <SummaryCard
              title="Środki"
              value={
                summary
                  ? `${summary.balance.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}`
                  : undefined
              }
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SummaryCard
              title="Zainwestowane"
              value={
                summary
                  ? `${summary.invested.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}`
                  : undefined
              }
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SummaryCard
              title="Dokumenty"
              value={summary ? `${summary.documents} pliki` : undefined}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SummaryCard
              title="Powiadomienia"
              value={summary ? `${summary.notifications}` : undefined}
              loading={loading}
            />
          </Grid>
        </Grid>

        <Paper sx={{ p: 3 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                Najbliższe spotkanie
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {summary?.nextMeeting ?? 'Brak zaplanowanych spotkań'}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined">Szczegóły</Button>
              <Button variant="contained" color="secondary">
                Dołącz
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
      <ToastStack />
    </AppShell>
  );
};

export default DashboardPage;
