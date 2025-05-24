const AppError = require("./AppError");

class ConflictError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 409);
  }
}

module.exports = ConflictError;
