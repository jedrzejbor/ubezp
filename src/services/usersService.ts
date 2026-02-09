import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { GenericListResponse, FetcherParams, GenericRecord } from '@/types/genericList';

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

  // Filters - backend expects filters[key]=value format
  // Multi-select values should be comma-separated: filters[firstname]=Marcin,Krzysztof
  Object.entries(params.filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        // For multiple values, send as comma-separated in single parameter
        const nonEmptyValues = value.filter((v) => v !== undefined && v !== null && v !== '');
        if (nonEmptyValues.length > 0) {
          query.set(`filters[${key}]`, nonEmptyValues.join(','));
        }
      } else {
        query.set(`filters[${key}]`, String(value));
      }
    }
  });

  return query.toString();
};

/**
 * Fetch users table data from backend API
 */
export const fetchUsersTable = async (
  params: FetcherParams
): Promise<GenericListResponse<UserRecord>> => {
  const queryString = buildQueryString(params);
  const endpoint = `${API_ENDPOINTS.USERS_TABLE}?${queryString}`;
  // Helpful for debugging: log full endpoint when devtools are enabled

  if (process.env.NODE_ENV !== 'production') console.debug('[usersService] GET', endpoint);

  return apiClient.get<GenericListResponse<UserRecord>>(endpoint);
};

/**
 * Delete user by ID
 */
export const deleteUser = async (userId: string | number, password: string): Promise<void> => {
  await apiClient.delete(`/api/user/${userId}`, {
    body: JSON.stringify({ password })
  });
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
