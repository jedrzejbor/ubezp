# Generic List View System - Implementation

## 🎯 Overview

This PR introduces a comprehensive **Generic List/Table System** that automatically renders data based on metadata returned from the backend. The system provides a reusable, type-safe solution for displaying lists across the entire application.

## 📋 What's New

### Core Components

#### 1. **Type System** (`src/types/genericList.ts`)

Complete TypeScript type definitions for the generic list system:

- **`ColumnDef`** - Column definitions with support for multiple types
  - Types: `text`, `email`, `phone`, `full_name`, `status`, `badge`, `actions`
- **`FilterDef`** - Filter definitions with multiple types and options
  - Types: `select`, `text`, `date`, `date_range`
- **`SortDef`** - Sorting definitions with property, order, and label

- **`ActionDef`** - Action definitions for buttons and menu items
  - Types: `button_primary`, `button_secondary`, `button_delete`, `button_download`, `icon`

- **`GenericListResponse<T>`** - Standardized API response format:
  ```typescript
  {
    data: T[],
    meta: {
      pagination: { page, perPage, count, pages },
      sortable: SortDef[],
      filtersDefs: FilterDef[],
      generalActions: GeneralActionDef[],
      columnDefs: ColumnDef[]
    }
  }
  ```

#### 2. **State Management Hook** (`src/hooks/useGenericListController.ts`)

Centralized hook managing all list operations:

**Features:**

- ✅ Search with 300ms debounce
- ✅ Sorting (ASC/DESC)
- ✅ Multi-field filtering
- ✅ Pagination
- ✅ Multi-row selection with bulk actions
- ✅ Automatic data refetching
- ✅ Error handling

**API:**

```typescript
const {
  data,
  meta,
  loading,
  error,
  page,
  search,
  sortProperty,
  sortOrder,
  filters,
  selectedRows,
  selectedIds,
  setSearch,
  setSort,
  setFilter,
  setPage,
  toggleRowSelection,
  toggleAllSelection,
  clearFilters,
  refetch
} = useGenericListController({ fetcher, rowKey, initialPerPage });
```

#### 3. **Main Component** (`src/components/lists/GenericListView.tsx`)

Main wrapper component handling layout and interactions:

**Desktop Layout:**

```
┌─────────────────────────────────────┐
│ Lista Użytkowników    [+ Dodaj]     │  ← Title + Action button
├─────────────────────────────────────┤
│ [🔍 Szukaj] [Filtry] [Sortuj]       │  ← Toolbar
├─────────────────────────────────────┤
│                                      │
│         Scrollable Table             │  ← Data table
│         (fixed header)               │
│                                      │
├─────────────────────────────────────┤
│              [1] 2 3 ... 10 →        │  ← Pagination (right)
└─────────────────────────────────────┘
```

**Features:**

- White container with `calc(100vh - 180px)` height
- Responsive (desktop table / mobile cards)
- Sort menu (Material-UI Menu)
- Filter drawer (Material-UI Drawer, 320px width)
- Custom pagination styling

#### 4. **Desktop Table Renderer** (`src/components/lists/DesktopTableRenderer.tsx`)

Desktop table implementation with Figma-aligned styling:

**Specifications:**

- Header: 48px height, `#FAFAFA` background
- Rows: 72px height
- Company column: 32x32px icon box + text
- Status: 6px dot + text (not chip)
- Account type: outlined chip
- Checkboxes: `#D0D5DD` unchecked, `#1E1F21` checked

**Row Actions Menu:**

```
┌─────────────┐
│ 📄 Podgląd  │
├─────────────┤  ← Divider (0 margin)
│ 📥 Pobierz  │
├─────────────┤
│ ✏️  Edytuj  │
├─────────────┤
│ 🗑️  Usuń    │
└─────────────┘
```

Menu styling:

- Border: `1px solid #D0D5DD`
- Border-radius: `4px`
- Padding: `12px 16px`
- Icons: `#8E9098`
- Text: `#1E1F21`, font-weight 500
- Hover: transparent (no background)

#### 5. **Mobile Card Renderer** (`src/components/lists/MobileCardListRenderer.tsx`)

Card-based layout for mobile devices:

- Card layout with metadata
- Three-dot menu for actions
- Status dots + chips
- Responsive spacing

### Example Implementation

#### **UsersPage** (`src/pages/UsersPage.tsx`)

Example usage of the generic list system:

```typescript
const UsersPage = () => {
  const handlers = {
    create: () => console.log('Create user'),
    view: (user) => console.log('View', user),
    edit: (user) => console.log('Edit', user),
    delete: (user) => console.log('Delete', user),
    bulkNotify: (ids) => console.log('Notify', ids)
  };

  return (
    <GenericListView
      title="Lista Użytkowników"
      fetcher={fetchUsersTable}
      handlers={handlers}
      bulkActions={[
        { label: 'Notify', handler: 'bulkNotify', icon: <NotificationsIcon /> }
      ]}
    />
  );
};
```

#### **UsersService** (`src/services/usersService.ts`)

Service layer with mock data support:

```typescript
const USE_MOCK_DATA = true; // Toggle mock/real API

export const fetchUsersTable = async (params: FetcherParams) => {
  if (USE_MOCK_DATA) {
    return getMockResponse(params);
  }
  const response = await apiClient.get(API_ENDPOINTS.USERS_TABLE, { params });
  return response.data;
};
```

**Mock Data Features:**

- 12 sample users
- Full filtering logic (status, account_type, search)
- Sorting logic (name, email, company, date)
- Pagination logic
- Row actions: view, edit, delete
- General action: create

## 🔄 Data Flow

### Backend → Frontend

**1. Backend Response:**

```json
{
  "data": [
    {
      "id": 1,
      "company": "Tech Solutions",
      "full_name": "Jan Kowalski",
      "email": "jan@example.com",
      "phone": "+48 123 456 789",
      "account_type": "Admin",
      "status": "Aktywny",
      "actions": [
        { "type": "button_primary", "label": "Podgląd", "handler": "view" },
        { "type": "button_secondary", "label": "Edytuj", "handler": "edit" },
        { "type": "button_delete", "label": "Usuń", "handler": "delete" }
      ]
    }
  ],
  "meta": {
    "pagination": { "page": 1, "perPage": 10, "count": 120, "pages": 12 },
    "columnDefs": [
      { "property": "company", "label": "Firma", "type": "text", "sortable": true },
      { "property": "full_name", "label": "Imię i Nazwisko", "type": "full_name" },
      { "property": "status", "label": "Status", "type": "status" }
    ],
    "sortable": [{ "property": "full_name", "order": "asc", "label": "Nazwa A-Z" }],
    "filtersDefs": [
      {
        "key": "status",
        "label": "Status",
        "type": "select",
        "is_multiple": true,
        "options": [{ "value": "active", "label": "Aktywny" }]
      }
    ],
    "generalActions": [
      { "type": "button_primary", "label": "Dodaj użytkownika", "handler": "create" }
    ]
  }
}
```

**2. Frontend Processing:**

- Hook receives data via `fetcher` function
- Parses `meta.columnDefs` → builds table headers
- Iterates over `data` → renders rows
- For each column, calls `renderCell(column, row)`
- For `actions`, renders three-dot menu
- Pagination from `meta.pagination`
- Filters from `meta.filtersDefs`
- Sorting from `meta.sortable`

**3. User Interactions:**

- User clicks "Edytuj" → calls `handlers.edit(row)`
- User changes filter → `setFilter()` → `refetch()` with new params
- User sorts → `setSort()` → backend receives `?sort=full_name&order=asc`
- User searches → 300ms debounce → `setSearch()` → `refetch()`

## 🎨 Design System

**Colors:**

- Primary: `#1E1F21` (black)
- Secondary: `#8F6D5F` (brown)
- Icons: `#8E9098` (gray)
- Borders: `#D0D5DD`, `#E5E7EB`, `#F0F0F0`
- Status: `#10B981` (success), `#EF4444` (error), `#F59E0B` (warning)

**Typography:**

- Font: Inter
- Headers: 24px (H5)
- Body: 14px
- Labels: 11px uppercase
- Buttons: 14px medium (500)

**Spacing:**

- Container height: `calc(100vh - 180px)`
- Row height: 72px
- Header height: 48px
- Menu padding: 12px 16px
- Icon gap: 8px
- Element gap: 16px

## 📁 File Structure

```
src/
├── types/
│   └── genericList.ts                    # TypeScript types
├── hooks/
│   └── useGenericListController.ts       # State management
├── components/
│   └── lists/
│       ├── GenericListView.tsx           # Main wrapper
│       ├── DesktopTableRenderer.tsx      # Desktop table
│       ├── MobileCardListRenderer.tsx    # Mobile cards
│       └── ListToolbar.tsx               # Toolbar component
├── services/
│   └── usersService.ts                   # API + Mock data
├── pages/
│   └── UsersPage.tsx                     # Example implementation
├── config/
│   └── api.ts                            # API endpoints (USERS_TABLE)
└── routes/
    └── router.tsx                        # Route: /app/users
```

## 🚀 How to Use in New Views

**1. Create a service:**

```typescript
// src/services/clientsService.ts
export const fetchClientsTable = async (params: FetcherParams) => {
  const response = await apiClient.get('/api/clients-table', { params });
  return response.data;
};
```

**2. Create a page:**

```typescript
// src/pages/ClientsPage.tsx
const ClientsPage = () => {
  const handlers = {
    create: () => navigate('/clients/new'),
    view: (client) => navigate(`/clients/${client.id}`),
    edit: (client) => navigate(`/clients/${client.id}/edit`),
    delete: (client) => deleteClient(client.id)
  };

  return (
    <GenericListView
      title="Lista Klientów"
      fetcher={fetchClientsTable}
      handlers={handlers}
    />
  );
};
```

**3. Backend returns proper format** with `data` + `meta`

**4. Done!** The system automatically:

- ✅ Builds the table
- ✅ Adds filters
- ✅ Adds sorting
- ✅ Adds pagination
- ✅ Adds actions

## ✨ Key Benefits

- ✅ **Reusability** - Single component for all lists
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Backend-driven** - Frontend only renders
- ✅ **Consistency** - Unified UX across app
- ✅ **Maintainability** - Changes in one place
- ✅ **Figma-aligned** - 100% design compliance
- ✅ **Mock-ready** - Easy testing without backend
- ✅ **Responsive** - Desktop table / Mobile cards
- ✅ **Accessible** - Proper ARIA labels and keyboard navigation

## 🔧 Technical Details

**Dependencies:**

- React 18
- TypeScript
- Material-UI v5
- React Router
- Zustand (for auth/ui stores)

**Performance:**

- Search debounce (300ms)
- Optimized re-renders with useCallback/useMemo
- Efficient state updates
- Lazy loading support ready

**Testing:**

- Mock data system for development
- Easy toggle between mock/real API
- Type-safe handlers

## 📝 Breaking Changes

None - this is a new feature addition.

## 🐛 Known Issues

None currently.

## 🔜 Future Enhancements

- [ ] Export functionality (CSV, Excel)
- [ ] Column visibility toggle
- [ ] Column reordering
- [ ] Advanced filters (date ranges, multi-select)
- [ ] Saved filter presets
- [ ] Virtual scrolling for large datasets
- [ ] Inline editing
- [ ] Drag & drop row reordering

## 📸 Screenshots

Route: `/app/users`

**Desktop View:**

- Full table with sorting, filtering, pagination
- Row actions menu (Podgląd, Edytuj, Usuń)
- Multi-select with bulk actions
- Responsive layout

**Mobile View:**

- Card-based layout
- Three-dot menu for actions
- Touch-friendly interactions

---

## ✅ Checklist

- [x] TypeScript types defined
- [x] Core hook implemented
- [x] Desktop renderer with Figma styling
- [x] Mobile renderer
- [x] Example page (UsersPage)
- [x] Mock data system
- [x] Route registered
- [x] API endpoint configured
- [x] ESLint errors fixed
- [x] Documentation added
- [x] No TypeScript errors
- [x] Responsive design tested

---

**Ready for review and merge!** 🚀
