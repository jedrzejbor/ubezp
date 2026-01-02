import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import Brightness7RoundedIcon from '@mui/icons-material/Brightness7Rounded';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { useColorMode } from './theme';

function App() {
  const theme = useTheme();
  const { toggleColorMode, mode } = useColorMode();

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
      <Card variant="outlined" sx={{ backgroundImage: 'none', borderColor: 'divider' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                  boxShadow: 4,
                }}
              >
                <ColorLensRoundedIcon />
              </Box>
              <Box>
                <Typography variant="overline" color="text.secondary" fontWeight={700}>
                  Brand system
                </Typography>
                <Typography variant="h5" component="h1">
                  MUI + ThemeProvider
                </Typography>
              </Box>
            </Stack>
            <IconButton
              aria-label="Przełącz motyw"
              onClick={toggleColorMode}
              color="primary"
              size="large"
            >
              {mode === 'light' ? <Brightness4RoundedIcon /> : <Brightness7RoundedIcon />}
            </IconButton>
          </Stack>

          <Typography variant="body1" color="text.secondary">
            Paleta brandowa, typografia, siatka spacingu i shape zostały zdefiniowane globalnie. Do
            dyspozycji jest także <strong>CssBaseline</strong> z resetem zgodnym z Figma oraz
            obsługa motywu jasnego/ciemnego.
          </Typography>

          <Divider />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              startIcon={<LightModeRoundedIcon />}
              onClick={() => mode === 'dark' && toggleColorMode()}
              fullWidth
            >
              Jasny motyw
            </Button>
            <Button
              variant="outlined"
              startIcon={<NightsStayRoundedIcon />}
              onClick={() => mode === 'light' && toggleColorMode()}
              fullWidth
            >
              Ciemny motyw
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
