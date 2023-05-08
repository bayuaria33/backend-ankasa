const express = require("express");
const router = express.Router();
const { insert, getByUser, getById, updatePayment } = require("../controller/bookingsController");
const { protect } = require("../middleware/auth");

router.post("/", insert);
router.post("/update-payment", updatePayment);
router.get("/my-bookings", protect, getByUser);
router.get("/:id", getById)
module.exports = router;
