const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItems");

const { login, createUser } = require("../controllers/users");

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/users", userRouter);
router.use("/items", itemRouter);

module.exports = router;
