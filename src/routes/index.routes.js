const express = require("express");
const router = express.Router();

router.use("/users", require("./user.routes"));
router.use("/products", require("./products.routes"));

module.exports = router;
