const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyAuthorization } = require("../middlewares/verifyAuthorization");
const {
  getShoppingCarts,
  getShoppingCartByUser,
  getShoppingCart,
  createShoppingCart,
  updateShoppingCart,
  deleteShoppingCart,
} = require("../controllers/shoppingCart.controller");

// router.get("/", verifyToken, verifyAuthorization, getShoppingCarts);
router.get("/", getShoppingCarts);
router.get("/:id/:cartId", verifyToken, verifyAuthorization, getShoppingCart);
router.get("/:id", getShoppingCartByUser);
router.post("/:id", verifyToken, verifyAuthorization, createShoppingCart);
router.put(
  "/:id/:cartId",
  verifyToken,
  verifyAuthorization,
  updateShoppingCart
);
router.delete(
  "/:id/:cartId",
  verifyToken,
  verifyAuthorization,
  deleteShoppingCart
);

module.exports = router;
