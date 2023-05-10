const express = require("express");
const router = express.Router();
const {
  insert,
  deleteTicket,
  getAll,
  getById,
  update,
  filterTicket,
} = require("../controller/ticketsController");

router.get("/all", getAll);
router.get("/filter", filterTicket);
router.get("/:id", getById);
router.put("/:id", update);
router.post("/", insert);
router.delete("/:id", deleteTicket);
module.exports = router;
