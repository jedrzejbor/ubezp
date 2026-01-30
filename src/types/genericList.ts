/**
 * Generic List Types
 * Typy dla generycznego widoku listy opartego na meta z backendu
 */

// ================== COLUMN DEFINITIONS ==================

export type ColumnType = 'text' | 'email' | 'phone' | 'full_name' | 'actions' | 'status' | 'badge';

export interface ColumnDef {
  type: ColumnType;
  label: string;
  property: string | null;
  sortable: boolean;
}

// ================== SORT DEFINITIONS ==================

export interface SortDef {
  property: string;
  label: string;
  order: 'asc' | 'desc';
}

// ================== FILTER DEFINITIONS ==================

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterDef {
  type: 'select' | 'text' | 'date' | 'date_range';
  key: string;
  label: string;
  options?: FilterOption[];
  is_multiple: boolean;
}

export type FiltersState = Record<string, string | string[]>;

// ================== ACTION DEFINITIONS ==================

export type ActionType = 'button_primary' | 'button_secondary' | 'button_delete' | 'button_icon';

export interface ActionDef {
  type: ActionType;
  label: string;
  handler: string;
  icon?: string;
}

export interface GeneralActionDef {
  type: ActionType;
  label: string;
  handler: string;
}

// ================== PAGINATION ==================

export interface PaginationMeta {
  page: number;
  perPage: number;
  pages: number;
  count: number;
}

// ================== META RESPONSE ==================

export interface ListMeta {
  pagination: PaginationMeta;
  sortable: SortDef[];
  filtersDefs: FilterDef[];
  generalActions: GeneralActionDef[];
  columnDefs: ColumnDef[];
}

// ================== API RESPONSE ==================

export interface GenericRecord {
  [key: string]: unknown;
  actions?: ActionDef[];
}

export interface GenericListResponse<T extends GenericRecord = GenericRecord> {
  data: T[];
  meta: ListMeta;
}

// ================== COMPONENT PROPS ==================

export type RowHandler<T extends GenericRecord = GenericRecord> = (row: T) => void | Promise<void>;
export type GeneralHandler = () => void | Promise<void>;
export type BulkHandler<T extends GenericRecord = GenericRecord> = (
  rows: T[]
) => void | Promise<void>;

export interface BulkAction {
  label: string;
  handler: string;
  variant?: 'primary' | 'secondary' | 'outlined';
  icon?: React.ReactNode;
}

export interface FetcherParams {
  page: number;
  perPage: number;
  search: string;
  sortProperty: string;
  sortOrder: 'asc' | 'desc';
  filters: FiltersState;
}

export type Fetcher<T extends GenericRecord = GenericRecord> = (
  params: FetcherParams
) => Promise<GenericListResponse<T>>;

export interface GenericListViewProps<T extends GenericRecord = GenericRecord> {
  title: string;
  fetcher: Fetcher<T>;
  handlers: Record<string, RowHandler<T> | GeneralHandler>;
  bulkActions?: BulkAction[];
  bulkHandlers?: Record<string, BulkHandler<T>>;
  /** Unique key to identify each row (defaults to 'id') */
  rowKey?: keyof T | ((row: T) => string);
  /** Initial page size */
  initialPerPage?: number;
}

// ================== CONTROLLER STATE ==================

export interface ListControllerState<T extends GenericRecord = GenericRecord> {
  // Data
  data: T[];
  meta: ListMeta | null;

  // Loading states
  loading: boolean;
  error: string | null;

  // Pagination
  page: number;
  perPage: number;

  // Search
  search: string;

  // Sort
  sortProperty: string;
  sortOrder: 'asc' | 'desc';

  // Filters
  filters: FiltersState;
  activeFiltersCount: number;

  // Selection
  selectedRows: T[];
  selectedIds: Set<string>;
  allSelected: boolean;
  someSelected: boolean;
}

export interface ListControllerActions<T extends GenericRecord = GenericRecord> {
  // Pagination
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;

  // Search
  setSearch: (search: string) => void;

  // Sort
  setSort: (property: string, order: 'asc' | 'desc') => void;

  // Filters
  setFilter: (key: string, value: string | string[]) => void;
  clearFilters: () => void;

  // Selection
  toggleRowSelection: (row: T) => void;
  toggleAllSelection: () => void;
  clearSelection: () => void;

  // Refetch
  refetch: () => Promise<void>;
}

export type UseGenericListController<T extends GenericRecord = GenericRecord> =
  ListControllerState<T> & ListControllerActions<T>;
