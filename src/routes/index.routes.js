const router = require("express").Router();

router.use("/users", require("./user.routes"));
router.use("/products", require("./products.routes"));
router.use("/shopping-cart", require("./shoppingCart.routes"));
router.use("/categories", require("./category.routes"));

module.exports = router;
