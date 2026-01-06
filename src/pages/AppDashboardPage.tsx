import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';

const highlights = [
  {
    title: 'Aktywne polisy',
    value: '4',
    icon: <SecurityRoundedIcon color="primary" fontSize="large" />,
    description: 'Wszystkie polisy opłacone i aktywne.'
  },
  {
    title: 'Ostatnie zgłoszenie',
    value: '12h temu',
    icon: <TimelineRoundedIcon color="secondary" fontSize="large" />,
    description: 'Sprawdzamy dokumentację i przygotowujemy decyzję.'
  },
  {
    title: 'Rekomendacja',
    value: 'Stabilny profil',
    icon: <InsightsRoundedIcon color="action" fontSize="large" />,
    description: 'Brak zaległości, brak czynności wymaganych.'
  }
];

const AppDashboardPage = () => (
  <Stack spacing={3}>
    <Stack spacing={0.5}>
      <Typography variant="h4" component="h1">
        Cześć! 👋
      </Typography>
      <Typography color="text.secondary">
        To jest zabezpieczony obszar aplikacji. Twoje dane są widoczne tylko po zalogowaniu.
      </Typography>
    </Stack>

    <Grid container spacing={2}>
      {highlights.map((card) => (
        <Grid item xs={12} md={4} key={card.title}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  {card.icon}
                  <div>
                    <Typography variant="overline" color="text.secondary">
                      {card.title}
                    </Typography>
                    <Typography variant="h6">{card.value}</Typography>
                  </div>
                </Stack>
                <Typography color="text.secondary">{card.description}</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Stack>
);

export default AppDashboardPage;
