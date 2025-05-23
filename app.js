require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");

const router = require("./routes/index");
const { NOT_FOUND } = require("./utils/errors");
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

// Request logging middleware
app.use(requestLogger);

// Routes
app.use("/", router);

// 404 fallback for unmatched routes
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
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
