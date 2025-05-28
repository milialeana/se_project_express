const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const testRouter = require("./test");

const {
  validateUserSignup,
  validateUserLogin,
} = require("../middlewares/validation");

// Crash Test
router.use("/", testRouter);

// Public routes
router.post("/signup", validateUserSignup, createUser);
router.post("/signin", validateUserLogin, login);
router.get("/items", getItems);

// Middleware
router.use(auth);

// Protected routes
router.use("/users", userRouter);
router.use("/items", itemRouter);

module.exports = router;
