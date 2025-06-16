export interface ApiError {
  message: string;
  statusCode?: number;
}

export class AppError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "AppError";
  }
}
