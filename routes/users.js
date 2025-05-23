const router = require("express").Router();
const {
  getCurrentUser,
  updateUser,
  getUserById,
} = require("../controllers/users");

const { validateUserUpdate, validateId } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateUserUpdate, updateUser);

router.get("/:userId", validateId("userId"), getUserById);

module.exports = router;
