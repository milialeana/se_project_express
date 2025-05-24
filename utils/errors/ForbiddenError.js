const AppError = require("./AppError");

class ForbiddenError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 403);
  }
}

module.exports = ForbiddenError;
