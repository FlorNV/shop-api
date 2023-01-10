const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyAuthorization } = require("../middlewares/verifyAuthorization");
const {
  getUsers,
  getUser,
  register,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.get("/:id", verifyToken, verifyAuthorization, getUser);
router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);
router.put("/:id", verifyToken, verifyAuthorization, updateUser);
router.delete("/:id", verifyToken, verifyAuthorization, deleteUser);

module.exports = router;
