const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index.js");

const app = express();
const { PORT = 3001 } = process.env;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

// Parse incoming JSON
app.use(express.json());

// ✅ Temporary authorization middleware
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // ← replace this with your actual test user _id
  };
  next();
});

// Mount the main router
app.use("/", mainRouter);

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
