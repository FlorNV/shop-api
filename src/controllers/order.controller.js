const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const getOrders = async (req, res) => {
  const {} = req.query;
  try {
    const orders = await Order.find();

    res.status(200).json({
      status: 200,
      message: "OK",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const getCustomerOrders = async (req, res) => {
  const { uid } = req.params;

  try {
    const orders = await Order.find({ user: uid });
    if (!orders.length) {
      return res.status(404).json({
        status: 404,
        message: "orders not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "OK",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "order not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "OK",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const createOrder = async (req, res) => {
  const { user, products } = req.body;

  try {
    // verificar que exista el usuario
    const userFound = await User.findById(user);
    if (!userFound) {
      return res.status(404).json({
        status: 404,
        message: "user not found",
      });
    }

    // verificar que la orden tenga productos
    if (!products) {
      return res.status(400).json({
        status: 400,
        message: "there are no products in the order",
      });
    }

    // verificar que existan los productos de la orden
    const items = products.map((item) => item.product);
    const productsFound = await Product.find({ _id: { $in: items } });
    if (productsFound.length !== products.length) {
      return res.status(404).json({
        status: 404,
        message: "product not found",
      });
    }

    // crear array con productos disponibles
    let productsList = [];
    let productsOutOfStock = [];
    products.forEach((p, i) => {
      if (p.quantity <= productsFound[i].stock) {
        productsList.push(p);
      } else {
        productsOutOfStock.push(p);
      }
    });

    if (productsList.length !== products.length) {
      return res.status(409).json({
        status: 409,
        message: "product out of stock",
        products: productsOutOfStock,
      });
    }

    // calcular total
    let totalPrice = 0;
    await Promise.all(
      productsList.map(async (p) => {
        const prod = await Product.findById(p.product);
        totalPrice += prod.price * p.quantity;
      })
    );

    // crear orden
    const order = new Order({
      products: productsList,
      user,
      ordered: new Date(),
      totalPrice,
    });

    await order.save();

    res.status(201).json({
      status: 201,
      message: "order created",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const confirmOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // buscar orden
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "order not found",
      });
    }

    // actualizar stock de productos
    await Promise.all(
      order.products.map(async (p) => {
        await Product.findByIdAndUpdate(p.product, {
          $inc: { stock: -p.quantity },
        });
      })
    );

    // cambiar el estado del pedido
    const orderConfirmed = await Order.findByIdAndUpdate(id, {
      status: "shipped",
    });

    res.status(200).json({
      status: 200,
      message: "order confirmed",
      order: orderConfirmed,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { user, products } = req.body;
  const data = req.body;

  try {
    // verificar que exista la orden
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "order not found",
      });
    }

    // verificar que exista el usuario
    const userFound = await User.findById(user);
    if (!userFound) {
      return res.status(404).json({
        status: 404,
        message: "user not found",
      });
    }

    // verificar que la orden tenga productos
    if (!products) {
      return res.status(400).json({
        status: 400,
        message: "there are no products in the order",
      });
    }

    // verificar que existan los productos de la orden
    const items = products.map((item) => item.product);
    const productsFound = await Product.find({ _id: { $in: items } });
    if (productsFound.length !== products.length) {
      return res.status(404).json({
        status: 404,
        message: "product not found",
      });
    }

    // crear array con productos disponibles
    let productsList = [];
    let productsOutOfStock = [];
    products.forEach((p, i) => {
      if (p.quantity <= productsFound[i].stock) {
        productsList.push(p);
      } else {
        productsOutOfStock.push(p);
      }
    });

    if (productsList.length !== products.length) {
      return res.status(409).json({
        status: 409,
        message: "product out of stock",
        products: productsOutOfStock,
      });
    }

    // calcular total
    let totalPrice = 0;
    await Promise.all(
      productsList.map(async (p) => {
        const prod = await Product.findById(p.product);
        totalPrice += prod.price * p.quantity;
      })
    );

    data.totalPrice = totalPrice;
    await Order.findByIdAndUpdate(id, data);

    res.status(200).json({
      status: 200,
      message: "order updated",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "order not found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "order deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

module.exports = {
  getOrders,
  getCustomerOrders,
  getOrder,
  createOrder,
  confirmOrder,
  updateOrder,
  deleteOrder,
};
