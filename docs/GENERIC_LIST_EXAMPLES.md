# Generic List - Przykłady Struktur Danych

## Przykładowa odpowiedź z backendu

### Endpoint: `GET /api/resource/users`

```json
{
  "data": [
    {
      "id": 1,
      "company": "Maspex",
      "full_name": "Jan Kowalski",
      "email": "jan.kowalski@example.pl",
      "phone": "+48 123 456 789",
      "account_type": "Admin Klient",
      "status": "aktywny",
      "actions": [
        {
          "type": "button_primary",
          "label": "Szczegóły",
          "handler": "view"
        },
        {
          "type": "button_secondary",
          "label": "Edytuj",
          "handler": "edit"
        },
        {
          "type": "button_delete",
          "label": "Usuń",
          "handler": "delete"
        }
      ]
    },
    {
      "id": 2,
      "company": "Kruk",
      "full_name": "Anna Nowak",
      "email": "anna.nowak@example.pl",
      "phone": "+48 987 654 321",
      "account_type": "Klient user",
      "status": "aktywny",
      "actions": [
        {
          "type": "button_primary",
          "label": "Szczegóły",
          "handler": "view"
        },
        {
          "type": "button_secondary",
          "label": "Edytuj",
          "handler": "edit"
        },
        {
          "type": "button_delete",
          "label": "Usuń",
          "handler": "delete"
        }
      ]
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "perPage": 10,
      "pages": 4,
      "count": 35
    },
    "sortable": [
      {
        "property": "created_at",
        "label": "Od najnowszych",
        "order": "desc"
      },
      {
        "property": "created_at",
        "label": "Od najstarszych",
        "order": "asc"
      },
      {
        "property": "full_name",
        "label": "Alfabetycznie A-Z",
        "order": "asc"
      },
      {
        "property": "full_name",
        "label": "Alfabetycznie Z-A",
        "order": "desc"
      }
    ],
    "filtersDefs": [
      {
        "type": "select",
        "key": "status",
        "label": "Status klienta",
        "is_multiple": false,
        "options": [
          {
            "label": "aktywny",
            "value": "active"
          },
          {
            "label": "nie aktywny",
            "value": "inactive"
          }
        ]
      },
      {
        "type": "select",
        "key": "account_type",
        "label": "Rodzaj konta",
        "is_multiple": false,
        "options": [
          {
            "label": "Klient user",
            "value": "client_user"
          },
          {
            "label": "Admin Klient",
            "value": "admin_client"
          },
          {
            "label": "Super Admin Klient",
            "value": "super_admin_client"
          }
        ]
      },
      {
        "type": "select",
        "key": "company",
        "label": "Firma",
        "is_multiple": false,
        "options": [
          {
            "label": "Wszystkie",
            "value": "all"
          },
          {
            "label": "Maspex",
            "value": "maspex"
          },
          {
            "label": "Kruk",
            "value": "kruk"
          },
          {
            "label": "Lubella",
            "value": "lubella"
          },
          {
            "label": "Łowicz",
            "value": "lowicz"
          },
          {
            "label": "Apart",
            "value": "apart"
          },
          {
            "label": "Kubuś",
            "value": "kubus"
          }
        ]
      }
    ],
    "generalActions": [
      {
        "type": "button_primary",
        "label": "Dodaj",
        "handler": "create"
      }
    ],
    "columnDefs": [
      {
        "type": "text",
        "label": "Firma",
        "property": "company",
        "sortable": false
      },
      {
        "type": "full_name",
        "label": "Imię i nazwisko",
        "property": "full_name",
        "sortable": true
      },
      {
        "type": "email",
        "label": "Email",
        "property": "email",
        "sortable": false
      },
      {
        "type": "phone",
        "label": "Telefon",
        "property": "phone",
        "sortable": false
      },
      {
        "type": "text",
        "label": "Rodzaj konta",
        "property": "account_type",
        "sortable": false
      },
      {
        "type": "text",
        "label": "Status klienta",
        "property": "status",
        "sortable": false
      },
      {
        "type": "actions",
        "label": "Akcje",
        "property": null,
        "sortable": false
      }
    ]
  }
}
```

## Przykładowe Query Parameters

### Podstawowe zapytanie

```
GET /api/resource/users?page=1&per-page=10
```

### Z wyszukiwaniem

```
GET /api/resource/users?page=1&per-page=10&search=kowalski
```

### Z sortowaniem

```
GET /api/resource/users?page=1&per-page=10&sort=full_name&sort-order=asc
```

### Z filtrami

```
GET /api/resource/users?page=1&per-page=10&filters[status]=active&filters[company]=maspex
```

### Z filtrami multi-select (wartości rozdzielone przecinkami)

```
GET /api/resource/users?page=1&per-page=10&filters[firstname]=Marcin,Krzysztof
```

### Pełne zapytanie

```
GET /api/resource/users?page=2&per-page=25&search=jan&sort=created_at&sort-order=desc&filters[status]=active&filters[account_type]=admin_client
```

### Dostępne klucze i wartości filtrów (backend spec)

**status**: `active`, `inactive`  
**account_type**: `client_user`, `admin_client`, `super_admin_client`  
**company**: `all`, `maspex`, `lubella`, `lowicz`, `apart`, `kubus`, `kruk`  
**firstname**, **lastname**, **position**, **phone**, **email**, **company**: pełne tekstowe wyszukiwanie (multi-select: wartości rozdzielone przecinkami)

## TypeScript Interface dla UserRecord

```typescript
export interface UserRecord extends GenericRecord {
  id?: string | number;
  company: string;
  full_name: string;
  email: string;
  phone: string;
  account_type: string;
  status: string;
}
```

## Przykład implementacji Service

```typescript
import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { GenericListResponse, FetcherParams, GenericRecord } from '@/types/genericList';

export interface UserRecord extends GenericRecord {
  id?: string | number;
  company: string;
  full_name: string;
  email: string;
  phone: string;
  account_type: string;
  status: string;
}

const buildQueryString = (params: FetcherParams): string => {
  const query = new URLSearchParams();

  query.set('page', String(params.page));
  query.set('per-page', String(params.perPage));

  if (params.search) {
    query.set('search', params.search);
  }

  if (params.sortProperty) {
    query.set('sort', params.sortProperty);
    query.set('sort-order', params.sortOrder);
  }

  // Filters - backend expects filters[key]=value format
  Object.entries(params.filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
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

export const fetchUsersTable = async (
  params: FetcherParams
): Promise<GenericListResponse<UserRecord>> => {
  const queryString = buildQueryString(params);
  const endpoint = `${API_ENDPOINTS.USERS_TABLE}?${queryString}`;

  return apiClient.get<GenericListResponse<UserRecord>>(endpoint);
};
```

## Przykład implementacji Page Component

```typescript
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GenericListView } from '@/components/lists';
import { fetchUsersTable, UserRecord } from '@/services/usersService';

const UsersPage = () => {
  const navigate = useNavigate();

  const handleViewUser = useCallback((row: UserRecord) => {
    navigate(`/app/users/${row.id}`);
  }, [navigate]);

  const handleEditUser = useCallback((row: UserRecord) => {
    navigate(`/app/users/${row.id}/edit`);
  }, [navigate]);

  const handleDeleteUser = useCallback(async (row: UserRecord) => {
    if (window.confirm(`Czy na pewno chcesz usunąć użytkownika ${row.full_name}?`)) {
      // Delete logic
    }
  }, []);

  const handleCreateUser = useCallback(() => {
    navigate('/app/users/create');
  }, [navigate]);

  const handlers = {
    view: handleViewUser,
    edit: handleEditUser,
    delete: handleDeleteUser,
    create: handleCreateUser
  };

  return (
    <GenericListView<UserRecord>
      title="Lista Użytkowników"
      fetcher={fetchUsersTable}
      handlers={handlers}
      rowKey={(row) => String(row.id || row.email)}
      initialPerPage={10}
    />
  );
};

export default UsersPage;
```

## Typy akcji (ActionType)

- `button_primary` - Główna akcja (niebieski przycisk)
- `button_secondary` - Akcja drugorzędna (szary przycisk)
- `button_delete` - Akcja usuwania (czerwony przycisk)

## Typy kolumn (ColumnType)

- `text` - Zwykły tekst
- `email` - Email (z linkiem mailto:)
- `phone` - Numer telefonu
- `full_name` - Imię i nazwisko (z ikoną)
- `status` - Status (z kolorową kropką)
- `badge` - Badge/chip
- `actions` - Kolumna z akcjami (menu trzech kropek)

## Typy filtrów (FilterDef.type)

- `select` - Select/dropdown
- `text` - Pole tekstowe
- `date` - Data
- `date_range` - Zakres dat

## Wartości options w filtersDefs

Backend może zwrócić `options` w dwóch formatach:

### Format 1: Tablica (zalecany)

```json
"options": [
  {"label": "aktywny", "value": "active"},
  {"label": "nie aktywny", "value": "inactive"}
]
```

### Format 2: Obiekt

```json
"options": {
  "active": {"label": "aktywny", "value": "active"},
  "inactive": {"label": "nie aktywny", "value": "inactive"}
}
```

Frontend automatycznie normalizuje oba formaty do tablicy.

## Przykładowe dane dla różnych encji

### Klienci (Clients)

```typescript
interface ClientRecord extends GenericRecord {
  id: number;
  name: string;
  nip: string;
  email: string;
  phone: string;
  status: string;
}
```

### Polisy (Policies)

```typescript
interface PolicyRecord extends GenericRecord {
  id: number;
  policy_number: string;
  client_name: string;
  start_date: string;
  end_date: string;
  premium: number;
  status: string;
}
```

### Faktury (Invoices)

```typescript
interface InvoiceRecord extends GenericRecord {
  id: number;
  invoice_number: string;
  client_name: string;
  amount: number;
  issue_date: string;
  due_date: string;
  status: string;
}
```
