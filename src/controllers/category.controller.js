const Category = require("../models/Category");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      status: 200,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        status: 404,
        message: "category not found",
      });
    }

    res.status(200).json({
      status: 200,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const createCategory = async (req, res) => {
  const data = req.body;

  try {
    const category = new Category(data);
    await category.save();

    res.status(200).json({
      status: 200,
      message: "category created",
      data: category,
    });
  } catch (error) {
    if (error.code && error.code === 11000) {
      return res.status(409).json({
        status: 409,
        message: "this category already exists",
      });
    }

    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(id, data);

    if (!category) {
      return res.status(404).json({
        status: 404,
        message: "category not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "category updated",
      data: category,
    });
  } catch (error) {
    if (error.code && error.code === 11000) {
      return res.status(409).json({
        status: 409,
        message: "this category already exists",
      });
    }

    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        status: 404,
        message: "category not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "category deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
