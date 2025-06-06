const AppError = require("./AppError");

class NotFoundError extends AppError {
  constructor(message = "Requested resource not found") {
    super(message, 404);
  }
}

module.exports = NotFoundError;
