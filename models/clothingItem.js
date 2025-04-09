const mongoose = require("mogoose");

const userSchema = new mongoose.Schema({});

module.exports = mongoose.model("item", clothingItemSchema);
