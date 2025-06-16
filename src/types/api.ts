export interface ApiError {
  message: string;
  statusCode?: number;
}

export interface ApiErrorResponse {
  data: ApiError;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: {
    url?: string;
    method?: string;
    headers?: Record<string, string>;
  };
}
