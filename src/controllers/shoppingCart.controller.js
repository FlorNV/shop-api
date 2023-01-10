const ShoppingCart = require("../models/ShoppingCart");

const getShoppingCarts = async (req, res) => {
  try {
    const shoppingCarts = await ShoppingCart.find()
      .populate("products.product")
      .populate("user");

    res.status(200).json({
      status: 200,
      data: shoppingCarts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const getShoppingCart = async (req, res) => {
  const { cartId } = req.params;
  try {
    const shoppingCart = await ShoppingCart.find(cartId);

    res.status(200).json({
      status: 200,
      data: shoppingCart,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const getShoppingCartByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const shoppingCart = await ShoppingCart.findOne({ user: { _id: id } });

    res.status(200).json({
      status: 200,
      data: shoppingCart,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const createShoppingCart = async (req, res) => {
  const data = req.body;
  try {
    const shoppingCart = new ShoppingCart({
      ...data,
      createdAt: new Date(),
    });

    await shoppingCart.save();

    res.status(200).json({
      status: 200,
      message: "shopping cart created",
      data: shoppingCart,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const updateShoppingCart = async (req, res) => {
  const { cartId } = req.params;
  const data = req.body;
  try {
    const shoppingCart = await ShoppingCart.findByIdAndUpdate(cartId, data);

    if (!shoppingCart) {
      return res.status(404).json({
        status: 404,
        message: "shopping cart not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "shopping cart updated",
      data: shoppingCart,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const deleteShoppingCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    const shoppingCart = await ShoppingCart.findByIdAndDelete(cartId);

    if (!shoppingCart) {
      return res.status(404).json({
        status: 404,
        message: "shopping cart not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "shopping cart updated",
      data: shoppingCart,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

module.exports = {
  getShoppingCarts,
  getShoppingCart,
  createShoppingCart,
  updateShoppingCart,
  deleteShoppingCart,
};
