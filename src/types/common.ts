export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface BaseApiResponse {
  success: boolean;
  message: string;
}

export interface PaginatedApiResponse<T> extends BaseApiResponse {
  data: T[];
  pagination: PaginationMeta;
}

export interface SingleApiResponse<T> extends BaseApiResponse {
  data: T;
}

export interface EmptyApiResponse extends BaseApiResponse {
  data?: null;
}
