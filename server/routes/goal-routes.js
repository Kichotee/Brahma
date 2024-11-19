const express = require("express");
const router = express.Router();
const {
  getJournals,
  postJournals,
  updateJournals,
  delJournals,
} = require("../controllers/goal-controller");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getJournals);

router.route("/create").post(protect, postJournals);
router.route("/update").put(protect, updateJournals);
router.route("/:id").delete(protect, delJournals);

module.exports = router;
