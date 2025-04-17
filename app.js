const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect("mongodb://localhost:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Controllers and middleware
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const router = require("./routes/index");

// Public routes
app.post("/signup", createUser);
app.post("/signin", login);

// Global auth middleware
app.use(auth);

// Protected routes
app.use("/", router);

// Fallback
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
