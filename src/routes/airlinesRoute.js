const express = require("express");
const router = express.Router();
const {
  getAll,
  insert,
  update,
  getById,
} = require("../controller/airlinesController");
const { upload } = require("../middleware/upload");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", upload.single("photo"), insert);
router.put("/:id", upload.single("photo"), update);

module.exports = router;
