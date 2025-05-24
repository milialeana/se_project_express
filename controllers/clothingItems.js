const ClothingItem = require("../models/clothingItem");

const {
  CREATED,
  OK,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors");

// Get all items
const getItems = (res, next) => {
  ClothingItem.find({})
    .lean()
    .then((items) => {
      return res.send(items);
    })
    .catch(next);
};

// Create new item
const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      return res.status(CREATED).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid item data"));
      }
      return next(err);
    });
};

// Delete item
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        throw new ForbiddenError("Only your own items can be deleted");
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then(() => {
      return res.status(OK).send({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(err);
    });
};

// Like item
const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(err);
    });
};

// Dislike item
const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(err);
    });
};

module.exports = {
  getItems,
  createClothingItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
