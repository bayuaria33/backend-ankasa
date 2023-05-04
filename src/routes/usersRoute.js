const express = require("express");
const router = express.Router();
const { registerUser, getOTPbyEmail, verifyEmailOTP, otpUser, login, updateUser } = require("../controller/usersController");
const { protect } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

router.post('/login',login)
router.post('/register/:role', registerUser)
router.post('/otp' , getOTPbyEmail)
router.post('/otp/confirm', verifyEmailOTP)
router.post('/verify', otpUser)
router.put("/update", upload.single("photo"), protect, updateUser);
module.exports = router;
