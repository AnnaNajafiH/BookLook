class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends CustomError {
  constructor(message) {
    super(message, 400);
  }
}

class AuthenticationError extends CustomError {
  constructor(message = 'Not authenticated') {
    super(message, 401);
  }
}

class AuthorizationError extends CustomError {
  constructor(message = 'Not authorized') {
    super(message, 403);
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

class ConflictError extends CustomError {
  constructor(message = 'Resource already exists') {
    super(message, 409);
  }
}

export {
  CustomError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError
};
