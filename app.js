require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const rateLimiter = require("./middlewares/rateLimiter");

const router = require("./routes");
const NotFoundError = require("./utils/errors/NotFoundError");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rate Limiter
app.use(rateLimiter);

// Request logging middleware
app.use(requestLogger);

// Routes
app.use("/", router);

// 404 fallback for unmatched routes
app.use((req, res, next) => {
  next(new NotFoundError());
});

// Error logging (after routes)
app.use(errorLogger);

// Celebrate validation errors
app.use(errors());

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
