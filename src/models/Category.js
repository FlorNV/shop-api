const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = model("Category", CategorySchema);
