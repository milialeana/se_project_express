class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const CONFLICT = 409;
const OK = 200;
const CREATED = 201;

module.exports = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,

  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  SERVER_ERROR,
  CONFLICT,
  OK,
  CREATED,
};
