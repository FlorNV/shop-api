const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = model("Category", CategorySchema);
