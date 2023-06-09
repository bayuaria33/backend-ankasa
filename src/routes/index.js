const express = require("express");
const router = express.Router();
const UsersRoute = require("../routes/usersRoute");
const AirlineRoute = require("../routes/airlinesRoute");
const TicketsRoute = require("../routes/ticketsRoute");
const BookingsRoute = require("../routes/bookingsRoute");

router.use("/users", UsersRoute);
router.use("/airlines", AirlineRoute);
router.use("/tickets", TicketsRoute);
router.use("/bookings", BookingsRoute);
module.exports = router;
