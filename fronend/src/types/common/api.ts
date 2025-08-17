export interface ApiResponse<T> {
  data: T;
  total?: number;
  message?: string;
  success: boolean;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}
