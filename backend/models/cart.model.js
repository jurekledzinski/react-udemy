const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    required: true,
  },
  totalQtyCart: {
    type: Number,
    required: true,
  },
  totalPriceCart: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
