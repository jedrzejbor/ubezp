import { API_BASE_URL } from '@/config/api';
import { useAuthStore } from '@/store/authStore';

/**
 * Klient HTTP do komunikacji z backendem
 * Automatycznie dodaje:
 * - Basic Auth header dla Traefik (infrastruktura) - używamy X-Custom-Auth lub Proxy-Authorization
 * - Bearer token dla API aplikacji (jeśli użytkownik zalogowany)
 *
 * UWAGA: Traefik Basic Auth i Bearer token dla API używają tego samego nagłówka Authorization.
 * Rozwiązanie: Dla niezalogowanych użytkowników używamy Basic Auth,
 * dla zalogowanych używamy Bearer token (Traefik powinien przepuszczać oba).
 */

// Basic Auth credentials dla Traefik
const BASIC_AUTH_USER = 'cliffside';
const BASIC_AUTH_PASSWORD = '&vj!93JYiWM11SHCNDguNMEUqRY4GG&y';
const BASIC_AUTH_TOKEN = btoa(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASSWORD}`);

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(skipAuth = false): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    // Sprawdź czy użytkownik jest zalogowany
    const token = !skipAuth ? useAuthStore.getState().token : null;

    if (token) {
      // Użytkownik zalogowany - Bearer token dla API
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      // Użytkownik niezalogowany - Basic Auth dla Traefik
      headers['Authorization'] = `Basic ${BASIC_AUTH_TOKEN}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData: Partial<ApiError> = {};

      try {
        errorData = await response.json();
      } catch {
        // Response nie jest JSON-em
      }

      const error: ApiError = {
        message: errorData.message || `Błąd HTTP: ${response.status}`,
        errors: errorData.errors,
        status: response.status
      };

      throw error;
    }

    // Niektóre odpowiedzi mogą być puste (np. 204 No Content)
    const text = await response.text();
    return text ? JSON.parse(text) : ({} as T);
  }

  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { skipAuth, ...fetchOptions } = options;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(skipAuth),
      ...fetchOptions
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: unknown, options: RequestOptions = {}): Promise<T> {
    const { skipAuth, ...fetchOptions } = options;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(skipAuth),
      body: data ? JSON.stringify(data) : undefined,
      ...fetchOptions
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: unknown, options: RequestOptions = {}): Promise<T> {
    const { skipAuth, ...fetchOptions } = options;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(skipAuth),
      body: data ? JSON.stringify(data) : undefined,
      ...fetchOptions
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data?: unknown, options: RequestOptions = {}): Promise<T> {
    const { skipAuth, ...fetchOptions } = options;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(skipAuth),
      body: data ? JSON.stringify(data) : undefined,
      ...fetchOptions
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { skipAuth, ...fetchOptions } = options;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(skipAuth),
      ...fetchOptions
    });

    return this.handleResponse<T>(response);
  }
}

// Eksportuj singleton klienta API
export const apiClient = new ApiClient(API_BASE_URL);

// Eksportuj typ błędu API do użycia w komponentach
export type { ApiError };
