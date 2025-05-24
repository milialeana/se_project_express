const AppError = require("./AppError");

class UnauthorizedError extends AppError {
  constructor(message = "UnauthorizedError") {
    super(message, 401);
  }
}

module.exports = UnauthorizedError;
