const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
} = require("../controllers/category-controller");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getCategories);
router.post("/create", createCategory);
router.route("/update/:id").patch(updateCategory);

module.exports = router;
