export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface DashboardSummary {
  balance: number;
  invested: number;
  documents: number;
  notifications: number;
  nextMeeting?: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldFail = () => Math.random() < 0.12;

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
      email
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
