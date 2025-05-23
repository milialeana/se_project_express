const express = require("express");

const router = express.Router();

const {
  createClothingItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const {
  validateClothingItem,
  validateId,
} = require("../middlewares/validation");

// Create a clothing item
router.post("/", validateClothingItem, createClothingItem);

// Delete an item by ID
router.delete("/:itemId", validateId("itemId"), deleteItem);

// Like an item
router.put("/:itemId/likes", validateId("itemId"), likeItem);

// Dislike an item
router.delete("/:itemId/likes", validateId("itemId"), dislikeItem);

module.exports = router;
