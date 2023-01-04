const User = require("../models/User");

const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "user not found",
      });
    }

    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const register = async (req, res, next) => {
  const data = req.body;

  try {
    const newUser = new User(data);
    await newUser.save();

    res.status(201).json({
      status: 201,
      message: "user created",
      data: newUser,
    });
  } catch (error) {
    if (error.code && error.code === 11000) {
      const field = Object.keys(error.keyValue);
      return res.status(409).json({
        status: 409,
        message: `${field} already in use`,
      });
    }

    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const login = async (req, res, next) => {};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, newData);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "user not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "user updated",
    });
  } catch (error) {
    if (error.code && error.code === 11000) {
      const field = Object.keys(error.keyValue);
      return res.status(409).json({
        status: 409,
        message: `${field} already in use`,
      });
    }

    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "user not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "user deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

module.exports = {
  getUser,
  register,
  login,
  updateUser,
  deleteUser,
};
