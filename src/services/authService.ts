import { apiClient, type ApiError } from './apiClient';
import { API_ENDPOINTS } from '@/config/api';

// ============================================
// Typy dla API
// ============================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TwoFactorCredentials extends LoginCredentials {
  token: string;
}

export interface ApiUser {
  id: number;
  firstname: string;
  lastname: string;
  position: string;
  created_at: string;
}

export interface LoginResponse {
  // Odpowiedź z pierwszego kroku logowania (przed 2FA)
  message?: string;
  requires_2fa?: boolean;
}

export interface TwoFactorResponse {
  user: ApiUser;
  token: string;
}

// Typ dla wewnętrznego użycia w aplikacji (znormalizowany)
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  firstname: string;
  lastname: string;
  position: string;
  createdAt: string;
  [key: string]: unknown;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface DashboardSummary {
  balance: number;
  invested: number;
  documents: number;
  notifications: number;
  nextMeeting?: string;
}

// ============================================
// Helpery
// ============================================

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldFail = () => Math.random() < 0.12;

/**
 * Mapuje odpowiedź API użytkownika na wewnętrzny format aplikacji
 */
const mapApiUserToAuthUser = (apiUser: ApiUser, email: string): AuthUser => ({
  id: String(apiUser.id),
  name: `${apiUser.firstname} ${apiUser.lastname}`,
  email,
  firstname: apiUser.firstname,
  lastname: apiUser.lastname,
  position: apiUser.position,
  createdAt: apiUser.created_at
});

// ============================================
// Funkcje API - Autentykacja
// ============================================

/**
 * Pierwszy krok logowania - wysyła email i hasło
 * Jeśli sukces, backend wyśle kod 2FA na email/telefon
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.LOGIN, credentials, {
      skipAuth: true
    });
    return response;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Niepoprawne dane logowania. Spróbuj ponownie.');
  }
};

/**
 * Drugi krok logowania - weryfikacja kodu 2FA
 * Zwraca token i dane użytkownika
 */
export const verifyTwoFactor = async (credentials: TwoFactorCredentials): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<TwoFactorResponse>(API_ENDPOINTS.LOGIN, credentials, {
      skipAuth: true
    });

    return {
      token: response.token,
      user: mapApiUserToAuthUser(response.user, credentials.email)
    };
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Nieprawidłowy kod autoryzacji. Spróbuj ponownie.');
  }
};

/**
 * Wylogowanie użytkownika
 * Wysyła Bearer token do backendu aby go unieważnić
 * Zwraca pustą odpowiedź 204 No Content
 */
export const logout = async (): Promise<void> => {
  try {
    // POST /api/logout z Bearer token w headerze
    // Backend zwraca 204 No Content
    await apiClient.post<void>(API_ENDPOINTS.LOGOUT);
  } catch (error) {
    const apiError = error as ApiError;
    // Nawet jeśli backend zwróci błąd, i tak wyczyścimy lokalny token
    console.error('Logout error:', apiError.message);
    throw new Error(apiError.message || 'Nie udało się wylogować.');
  }
};

// ============================================
// Mock funkcje (do usunięcia po pełnej integracji)
// ============================================

export const mockLogin = async (email: string, password: string): Promise<AuthResponse> => {
  await delay(900);

  if (shouldFail() || !password) {
    throw new Error('Niepoprawne dane logowania. Spróbuj ponownie.');
  }

  return {
    token: 'mock-token-123',
    user: {
      id: 'user-1',
      name: email.includes('anna') ? 'Anna Kowalska' : 'Alicja Nowak',
      email,
      firstname: email.includes('anna') ? 'Anna' : 'Alicja',
      lastname: email.includes('anna') ? 'Kowalska' : 'Nowak',
      position: 'Developer',
      createdAt: new Date().toISOString()
    }
  };
};

export const mockRequestPasswordReset = async (email: string): Promise<{ message: string }> => {
  await delay(800);

  if (shouldFail()) {
    throw new Error('Nie udało się wysłać kodu. Spróbuj ponownie za chwilę.');
  }

  return { message: `Wysłaliśmy instrukcje resetu na adres ${email}` };
};

export const mockCompletePasswordReset = async (code: string): Promise<{ message: string }> => {
  await delay(850);

  if (!code || shouldFail()) {
    throw new Error('Kod resetujący jest nieprawidłowy lub wygasł.');
  }

  return { message: 'Hasło zostało zaktualizowane' };
};

export const mockDashboardSummary = async (): Promise<DashboardSummary> => {
  await delay(650);

  return {
    balance: 348210.45,
    invested: 182400,
    documents: 12,
    notifications: 3,
    nextMeeting: '12 grudnia, 10:30'
  };
};

// Re-eksportuj typ błędu API
export type { ApiError };
