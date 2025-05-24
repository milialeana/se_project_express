const AppError = require("./AppError");

class NotFoundError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 404);
  }
}

module.exports = NotFoundError;
