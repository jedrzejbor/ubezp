import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { GenericListResponse, FetcherParams, GenericRecord } from '@/types/genericList';

// Włącz/wyłącz mockowanie danych (true = mock, false = prawdziwe API)
const USE_MOCK_DATA = true;

/**
 * User record type from backend
 */
export interface UserRecord extends GenericRecord {
  id?: string | number;
  company: string;
  full_name: string;
  email: string;
  phone: string;
  account_type: string;
  status: string;
}

/**
 * Mock data for development/testing
 */
const getMockResponse = (params: FetcherParams): GenericListResponse<UserRecord> => {
  // Row actions that apply to all users
  const rowActions = [
    { type: 'button_primary' as const, label: 'Szczegóły', handler: 'view' },
    { type: 'button_secondary' as const, label: 'Edytuj', handler: 'edit' },
    { type: 'button_delete' as const, label: 'Usuń', handler: 'delete' }
  ];

  // Full mock data set
  const allUsers: UserRecord[] = [
    {
      id: 1,
      company: 'ABC Sp. z o.o.',
      full_name: 'Jan Kowalski',
      email: 'jan.kowalski@abc.pl',
      phone: '+48 123 456 789',
      account_type: 'Admin',
      status: 'Aktywny',
      actions: rowActions
    },
    {
      id: 2,
      company: 'XYZ S.A.',
      full_name: 'Anna Nowak',
      email: 'anna.nowak@xyz.pl',
      phone: '+48 987 654 321',
      account_type: 'Użytkownik',
      status: 'Aktywny',
      actions: rowActions
    },
    {
      id: 3,
      company: 'Tech Solutions',
      full_name: 'Piotr Wiśniewski',
      email: 'piotr.w@tech.pl',
      phone: '+48 555 123 456',
      account_type: 'Manager',
      status: 'Nieaktywny',
      actions: rowActions
    },
    {
      id: 4,
      company: 'ABC Sp. z o.o.',
      full_name: 'Maria Dąbrowska',
      email: 'maria.d@abc.pl',
      phone: '+48 111 222 333',
      account_type: 'Użytkownik',
      status: 'Aktywny',
      actions: rowActions
    },
    {
      id: 5,
      company: 'Global Corp',
      full_name: 'Tomasz Lewandowski',
      email: 'tomasz.l@global.com',
      phone: '+48 444 555 666',
      account_type: 'Admin',
      status: 'Aktywny',
      actions: rowActions
    },
    {
      id: 6,
      company: 'StartUp Inc.',
      full_name: 'Katarzyna Zielińska',
      email: 'kasia.z@startup.io',
      phone: '+48 777 888 999',
      account_type: 'Użytkownik',
      status: 'Oczekujący',
      actions: rowActions
    },
    {
      id: 7,
      company: 'XYZ S.A.',
      full_name: 'Michał Szymański',
      email: 'michal.s@xyz.pl',
      phone: '+48 222 333 444',
      account_type: 'Manager',
      status: 'Aktywny',
      actions: rowActions
    },
    {
      id: 8,
      company: 'Tech Solutions',
      full_name: 'Agnieszka Woźniak',
      email: 'agnieszka.w@tech.pl',
      phone: '+48 666 777 888',
      account_type: 'Użytkownik',
      status: 'Aktywny',
      actions: rowActions
    },
    {
      id: 9,
      company: 'Global Corp',
      full_name: 'Paweł Kamiński',
      email: 'pawel.k@global.com',
      phone: '+48 333 444 555',
      account_type: 'Użytkownik',
      status: 'Nieaktywny',
      actions: rowActions
    },
    {
      id: 10,
      company: 'ABC Sp. z o.o.',
      full_name: 'Ewa Grabowska',
      email: 'ewa.g@abc.pl',
      phone: '+48 999 000 111',
      account_type: 'Admin',
      status: 'Aktywny',
      actions: rowActions
    },
    {
      id: 11,
      company: 'StartUp Inc.',
      full_name: 'Robert Mazur',
      email: 'robert.m@startup.io',
      phone: '+48 112 233 445',
      account_type: 'Użytkownik',
      status: 'Aktywny',
      actions: rowActions
    },
    {
      id: 12,
      company: 'XYZ S.A.',
      full_name: 'Joanna Krawczyk',
      email: 'joanna.k@xyz.pl',
      phone: '+48 556 677 889',
      account_type: 'Manager',
      status: 'Oczekujący',
      actions: rowActions
    }
  ];

  // Apply search filter
  let filteredUsers = [...allUsers];
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.full_name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.company.toLowerCase().includes(searchLower)
    );
  }

  // Apply filters
  if (params.filters.status) {
    filteredUsers = filteredUsers.filter((user) => user.status === params.filters.status);
  }
  if (params.filters.account_type) {
    filteredUsers = filteredUsers.filter(
      (user) => user.account_type === params.filters.account_type
    );
  }
  if (params.filters.company) {
    filteredUsers = filteredUsers.filter((user) => user.company === params.filters.company);
  }

  // Apply sorting
  if (params.sortProperty) {
    filteredUsers.sort((a, b) => {
      const aVal = String(a[params.sortProperty as keyof UserRecord] || '');
      const bVal = String(b[params.sortProperty as keyof UserRecord] || '');
      const comparison = aVal.localeCompare(bVal, 'pl');
      return params.sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  // Apply pagination
  const totalRecords = filteredUsers.length;
  const totalPages = Math.ceil(totalRecords / params.perPage);
  const startIndex = (params.page - 1) * params.perPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + params.perPage);

  return {
    data: paginatedUsers,
    meta: {
      pagination: {
        page: params.page,
        perPage: params.perPage,
        count: totalRecords,
        pages: totalPages
      },
      sortable: [
        { property: 'full_name', label: 'Imię i nazwisko A-Z', order: 'asc' as const },
        { property: 'full_name', label: 'Imię i nazwisko Z-A', order: 'desc' as const },
        { property: 'email', label: 'Email A-Z', order: 'asc' as const },
        { property: 'email', label: 'Email Z-A', order: 'desc' as const },
        { property: 'company', label: 'Firma A-Z', order: 'asc' as const },
        { property: 'company', label: 'Firma Z-A', order: 'desc' as const },
        { property: 'status', label: 'Status A-Z', order: 'asc' as const },
        { property: 'status', label: 'Status Z-A', order: 'desc' as const }
      ],
      filtersDefs: [
        {
          key: 'status',
          label: 'Status',
          type: 'select' as const,
          is_multiple: false,
          options: [
            { value: 'Aktywny', label: 'Aktywny' },
            { value: 'Nieaktywny', label: 'Nieaktywny' },
            { value: 'Oczekujący', label: 'Oczekujący' }
          ]
        },
        {
          key: 'account_type',
          label: 'Typ konta',
          type: 'select' as const,
          is_multiple: false,
          options: [
            { value: 'Admin', label: 'Admin' },
            { value: 'Manager', label: 'Manager' },
            { value: 'Użytkownik', label: 'Użytkownik' }
          ]
        },
        {
          key: 'company',
          label: 'Firma',
          type: 'select' as const,
          is_multiple: false,
          options: [
            { value: 'ABC Sp. z o.o.', label: 'ABC Sp. z o.o.' },
            { value: 'XYZ S.A.', label: 'XYZ S.A.' },
            { value: 'Tech Solutions', label: 'Tech Solutions' },
            { value: 'Global Corp', label: 'Global Corp' },
            { value: 'StartUp Inc.', label: 'StartUp Inc.' }
          ]
        }
      ],
      generalActions: [
        { type: 'button_primary' as const, label: 'Dodaj użytkownika', handler: 'create' },
        { type: 'button_secondary' as const, label: 'Eksportuj', handler: 'export' }
      ],
      columnDefs: [
        { property: 'company', label: 'Firma', type: 'text' as const, sortable: true },
        {
          property: 'full_name',
          label: 'Imię i nazwisko',
          type: 'full_name' as const,
          sortable: true
        },
        { property: 'email', label: 'Email', type: 'email' as const, sortable: true },
        { property: 'phone', label: 'Telefon', type: 'phone' as const, sortable: false },
        { property: 'account_type', label: 'Typ konta', type: 'text' as const, sortable: true },
        { property: 'status', label: 'Status', type: 'text' as const, sortable: true },
        {
          property: null,
          label: 'Akcje',
          type: 'actions' as const,
          sortable: false
        }
      ]
    }
  };
};

/**
 * Build query string from FetcherParams
 */
const buildQueryString = (params: FetcherParams): string => {
  const query = new URLSearchParams();

  // Pagination
  query.set('page', String(params.page));
  query.set('per-page', String(params.perPage));

  // Search
  if (params.search) {
    query.set('search', params.search);
  }

  // Sort
  if (params.sortProperty) {
    query.set('sort', params.sortProperty);
    query.set('sort-order', params.sortOrder);
  }

  // Filters
  Object.entries(params.filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        // For multiple values, send as comma-separated or multiple params
        if (value.length > 0) {
          query.set(key, value.join(','));
        }
      } else {
        query.set(key, value);
      }
    }
  });

  return query.toString();
};

/**
 * Fetch users table data
 */
export const fetchUsersTable = async (
  params: FetcherParams
): Promise<GenericListResponse<UserRecord>> => {
  // Use mock data when enabled
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getMockResponse(params);
  }

  const queryString = buildQueryString(params);
  const endpoint = `${API_ENDPOINTS.USERS_TABLE}?${queryString}`;

  return apiClient.get<GenericListResponse<UserRecord>>(endpoint);
};

/**
 * Delete user by ID
 */
export const deleteUser = async (userId: string | number): Promise<void> => {
  await apiClient.delete(`/api/users/${userId}`);
};

/**
 * Export users list
 */
export const exportUsers = async (filters?: FetcherParams['filters']): Promise<Blob> => {
  // This would typically return a file download
  const queryString = filters
    ? new URLSearchParams(filters as Record<string, string>).toString()
    : '';
  const response = await fetch(`/api/users/export?${queryString}`, {
    method: 'GET',
    headers: {
      Accept: 'application/octet-stream'
    }
  });
  return response.blob();
};
