import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface AuthUser {
  id: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
}

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export interface AuthActions {
  setToken: (token: string | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetAuth: () => void;
  logout: () => void;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setToken: (token) =>
          set(
            (state) => ({
              token,
              user: token ? state.user : null
            }),
            false,
            'auth/setToken'
          ),
        setUser: (user) => set({ user }, false, 'auth/setUser'),
        setLoading: (loading) => set({ loading }, false, 'auth/setLoading'),
        setError: (error) => set({ error }, false, 'auth/setError'),
        clearError: () => set({ error: null }, false, 'auth/clearError'),
        resetAuth: () => set(initialState, false, 'auth/resetAuth'),
        logout: () => set(initialState, false, 'auth/logout')
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ token: state.token, user: state.user })
      }
    ),
    { name: 'AuthStore' }
  )
);
