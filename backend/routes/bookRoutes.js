const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createBook,
  getAllBooks,
  getMyBooks,
  getNearbyBooks,
  updateBookStatus
} = require("../controllers/bookController");

router.post("/", auth, createBook);
router.get("/", getAllBooks);
router.get("/mine", auth, getMyBooks);
router.get("/nearby", getNearbyBooks);
router.patch("/:id/mark-unavailable", auth, updateBookStatus);

module.exports = router;
