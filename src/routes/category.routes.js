const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyAuthorization } = require("../middlewares/verifyAuthorization");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
