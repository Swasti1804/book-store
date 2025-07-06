const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  sendRequest,
  getReceivedRequests,
  updateRequestStatus
} = require("../controllers/requestController");

router.post("/:bookId", auth, sendRequest);
router.get("/received", auth, getReceivedRequests);
router.patch("/:id/status", auth, updateRequestStatus);

module.exports = router;
