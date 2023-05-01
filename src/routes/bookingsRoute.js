const express = require("express");
const router = express.Router();
const { insert, getByUser, getById } = require("../controller/bookingsController");
const { protect } = require("../middleware/auth");

router.post("/", insert);
router.get("/my-bookings", protect, getByUser);
router.get("/:id", getById)
module.exports = router;
