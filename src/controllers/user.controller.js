const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 200,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const getUser = async (req, res) => {
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

const register = async (req, res) => {
  const { password, ...data } = req.body;

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  try {
    const user = new User({
      ...data,
      password: encryptedPassword,
    });
    await user.save();

    // const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "4h",
    // });

    // res.status(201).json({
    //   status: 201,
    //   message: "user created",
    //   data: { user, token },
    // });

    res.status(201).json({
      status: 201,
      message: "user created",
      data: user,
    });
  } catch (error) {
    if (error.code && error.code === 11000) {
      const field = Object.keys(error.keyValue);
      return res.status(409).json({
        status: 409,
        message: `this ${field} is already in use`,
      });
    }

    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const login = async (req, res) => {
  const { username, email, password } = req.body;
  const condition = username ? { username } : { email };

  try {
    const user = await User.findOne(condition);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "user not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        message: "incorrect password",
      });
    }

    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      status: 200,
      message: "signed in",
      data: { user, token },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, ...data } = req.body;

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.findByIdAndUpdate(id, {
      ...data,
      password: encryptedPassword,
    });

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
        message: `this ${field} is already in use`,
      });
    }

    res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
};

const deleteUser = async (req, res) => {
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
  getUsers,
  getUser,
  register,
  login,
  updateUser,
  deleteUser,
};
