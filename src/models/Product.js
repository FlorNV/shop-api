const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // categories: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     required: true,
  //     ref: "Category",
  //   },
  // ],
});

module.exports = model("Product", ProductSchema);
