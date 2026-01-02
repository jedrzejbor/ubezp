import { PaletteMode, ThemeOptions, createTheme } from '@mui/material/styles';

const brandPalette = {
  primary: {
    main: '#3C5AFE',
    light: '#6A7CFF',
    dark: '#2A42D6',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FF6B6B',
    light: '#FFA8A8',
    dark: '#D94A4A',
    contrastText: '#0F172A',
  },
  info: {
    main: '#3BA7FF',
    light: '#7BC8FF',
    dark: '#1B6FB3',
  },
  success: {
    main: '#22C55E',
    light: '#63E495',
    dark: '#178D42',
  },
  warning: {
    main: '#F59E0B',
    light: '#F8C86C',
    dark: '#B77409',
  },
  error: {
    main: '#EF4444',
    light: '#F87171',
    dark: '#B91C1C',
  },
} satisfies ThemeOptions['palette'];

const typography: ThemeOptions['typography'] = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: { fontWeight: 700, letterSpacing: '-0.02em' },
  h2: { fontWeight: 700, letterSpacing: '-0.02em' },
  h3: { fontWeight: 700, letterSpacing: '-0.01em' },
  h4: { fontWeight: 700 },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  subtitle1: { fontWeight: 500 },
  subtitle2: { fontWeight: 500 },
  button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
};

const shape: ThemeOptions['shape'] = {
  borderRadius: 12,
};

const spacing = 8;

const commonComponents: ThemeOptions['components'] = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius,
        paddingInline: spacing * 2,
        paddingBlock: spacing * 1.25,
      },
    },
  },
  MuiPaper: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius,
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: 'var(--mui-palette-background-default)',
        color: 'var(--mui-palette-text-primary)',
      },
      a: {
        color: 'inherit',
        textDecoration: 'none',
      },
      '::selection': {
        backgroundColor: '#E5EDFF',
      },
    },
  },
};

export const buildTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...brandPalette,
      background:
        mode === 'light'
          ? { default: '#F7F8FB', paper: '#FFFFFF' }
          : { default: '#0B1021', paper: '#11172A' },
      text:
        mode === 'light'
          ? { primary: '#0F172A', secondary: '#475569' }
          : { primary: '#E2E8F0', secondary: '#94A3B8' },
    },
    typography,
    shape,
    spacing,
    components: {
      ...commonComponents,
    },
  });
