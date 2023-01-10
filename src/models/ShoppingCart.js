const { Schema, model } = require("mongoose");

const ShoppingCartSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  createdAt: {
    type: Date,
    required: false,
  },
});

module.exports = model("ShoppingCart", ShoppingCartSchema);
