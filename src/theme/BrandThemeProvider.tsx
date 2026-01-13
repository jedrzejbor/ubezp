import { CssBaseline, PaletteMode } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useUiStore } from '@/store/uiStore';

import { buildTheme } from './theme';

interface ColorModeContextValue {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue>({
  mode: 'light',
  toggleColorMode: () => undefined
});

interface BrandThemeProviderProps {
  children: React.ReactNode;
}

export const BrandThemeProvider: React.FC<BrandThemeProviderProps> = ({ children }) => {
  const { themeMode, setThemeMode } = useUiStore();
  const mode: PaletteMode = themeMode ?? 'light';

  const toggleColorMode = useCallback(() => {
    setThemeMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setThemeMode]);

  const theme = useMemo(() => buildTheme(mode), [mode]);

  const contextValue = useMemo(() => ({ mode, toggleColorMode }), [mode, toggleColorMode]);

  return (
    <ColorModeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useColorMode = () => useContext(ColorModeContext);
