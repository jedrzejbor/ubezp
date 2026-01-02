import { PaletteMode } from '@mui/material';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Toast {
  id: string;
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
}

export interface UiState {
  themeMode: PaletteMode;
  toasts: Toast[];
}

export interface UiActions {
  setThemeMode: (mode: PaletteMode) => void;
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const initialState: UiState = {
  themeMode: 'light',
  toasts: []
};

export const useUiStore = create<UiState & UiActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setThemeMode: (mode) => set({ themeMode: mode }, false, 'ui/setThemeMode'),
        addToast: (toast) =>
          set((state) => ({ toasts: [...state.toasts, toast] }), false, 'ui/addToast'),
        removeToast: (id) =>
          set(
            (state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }),
            false,
            'ui/removeToast'
          ),
        clearToasts: () => set({ toasts: [] }, false, 'ui/clearToasts')
      }),
      { name: 'ui-storage' }
    ),
    { name: 'UiStore' }
  )
);
