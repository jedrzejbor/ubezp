import { PaletteMode, ThemeOptions, createTheme } from '@mui/material/styles';

const brandPalette = {
  primary: {
    main: '#111218',
    light: '#1D1F27',
    dark: '#0A0B0F',
    contrastText: '#F7F5F2'
  },
  secondary: {
    main: '#A77D67',
    light: '#C39E8E',
    dark: '#8B6452',
    contrastText: '#0F1117'
  },
  info: {
    main: '#4C91E5',
    light: '#8CB8F0',
    dark: '#2C6EB8'
  },
  success: {
    main: '#25B776',
    light: '#6DD9A8',
    dark: '#18895A'
  },
  warning: {
    main: '#DFA048',
    light: '#F0C37F',
    dark: '#B97D2B'
  },
  error: {
    main: '#E86B6B',
    light: '#F29A9A',
    dark: '#BC4E4E'
  }
} satisfies ThemeOptions['palette'];

const typography: ThemeOptions['typography'] = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: { fontWeight: 700, letterSpacing: '-0.02em' },
  h2: { fontWeight: 700, letterSpacing: '-0.02em' },
  h3: { fontWeight: 700, letterSpacing: '-0.01em', fontSize: '1.75rem' },
  h4: { fontWeight: 700 },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  subtitle1: { fontWeight: 500 },
  subtitle2: { fontWeight: 500 },
  button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' }
};

const shape: ThemeOptions['shape'] = {
  borderRadius: 14
};

const spacing = 8;

const commonComponents: ThemeOptions['components'] = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius,
        paddingInline: spacing * 2,
        paddingBlock: spacing * 1.25,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none'
        }
      }
    }
  },
  MuiPaper: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius,
        backgroundImage: 'none'
      }
    }
  },
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: 'var(--mui-palette-background-default)',
        color: 'var(--mui-palette-text-primary)'
      },
      a: {
        color: 'inherit',
        textDecoration: 'none'
      },
      '::selection': {
        backgroundColor: '#E5EDFF'
      }
    }
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined'
    },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: shape.borderRadius - 2,
          backgroundColor: 'var(--mui-palette-background-paper)',
          '& fieldset': {
            borderColor: 'var(--mui-palette-divider)'
          },
          '&:hover fieldset': {
            borderColor: 'var(--mui-palette-secondary-main)'
          },
          '&.Mui-focused fieldset': {
            borderWidth: 1.5
          }
        }
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderColor: 'var(--mui-palette-divider)'
      }
    }
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: 'var(--mui-palette-divider)'
      }
    }
  },
  MuiLink: {
    defaultProps: {
      underline: 'hover'
    }
  }
};

export const buildTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...brandPalette,
      background:
        mode === 'light'
          ? { default: '#F5F3EF', paper: '#FFFFFF' }
          : { default: '#0E1117', paper: '#131823' },
      text:
        mode === 'light'
          ? { primary: '#1A1C22', secondary: '#4C5563' }
          : { primary: '#E7E9EE', secondary: '#A8B0C2' },
      divider: mode === 'light' ? '#E5E0DA' : '#252C38'
    },
    typography,
    shape,
    spacing,
    components: {
      ...commonComponents
    }
  });
