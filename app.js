const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { NOT_FOUND } = require("./utils/errors");

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect("mongodb://localhost:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Route index
const router = require("./routes/index");

// Protected routes
app.use("/", router);

// Middleware
const auth = require("./middlewares/auth");
app.use(auth);

// Fallback
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
