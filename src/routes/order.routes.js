const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyAuthorization } = require("../middlewares/verifyAuthorization");
const {
  getOrders,
  getCustomerOrders,
  getOrder,
  createOrder,
  confirmOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

router.get("/", getOrders);
router.get("/:id", getOrder);
router.get("/user/:uid", getCustomerOrders);
router.post("/", createOrder);
router.post("/:id", confirmOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
