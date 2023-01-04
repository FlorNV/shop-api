const express = require("express");
const router = express.Router();
const {
  getUser,
  register,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.get("/:id", getUser);
router.post("/register", register);
router.post("/login", login);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
