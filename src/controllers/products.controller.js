const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const data = await Product.find();

    res.status(200).json({
      status: 200,
      message: "OK",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "product not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "OK",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const createProduct = async (req, res) => {
  const data = req.body;
  try {
    const product = new Product(data);
    await product.save();

    res.status(201).json({
      status: 201,
      message: "product created",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, newData);

    if (!updatedProduct) {
      return res.status(404).json({
        status: 404,
        message: "product not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "product updated",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        status: 404,
        message: "product not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "product deleted",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
