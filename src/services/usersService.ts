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
  Object.entries(params.filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        // For multiple values, send as comma-separated
        if (value.length > 0) {
          query.set(`filters[${key}]`, value.join(','));
        }
      } else {
        query.set(`filters[${key}]`, value);
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
