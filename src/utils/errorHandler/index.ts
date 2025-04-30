export class ApiError extends Error {
  statusCode: number;
  details?: string;

  constructor(statusCode: number, message: string, details?: string) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = this.constructor.name; // Optional: Set the error name
  }

  static handleError(error: unknown): ApiError {
    if (error instanceof Error && error instanceof ApiError) return error;
    return new ApiError(500, 'Unexpected error');
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, details?: string) {
    super(404, message, details);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string, details?: string) {
    super(400, message, details);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string, details?: string) {
    super(409, message, details);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = 'Erro no servidor', details?: string) {
    super(500, message, details);
  }
}
