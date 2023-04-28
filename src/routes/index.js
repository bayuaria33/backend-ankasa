const express = require("express");
const router = express.Router();
const UsersRoute = require("../routes/usersRoute")
const AirlineRoute = require("../routes/airlinesRoute")
router.use("/users",UsersRoute)
router.use("/airlines", AirlineRoute)
module.exports = router;