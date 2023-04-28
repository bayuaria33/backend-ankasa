const express = require("express");
const router = express.Router();
const { registerUser, getOTPbyEmail, verifyEmailOTP, otpUser, login } = require("../controller/usersController");

router.post('/login',login)
router.post('/register/:role', registerUser)
router.post('/otp' , getOTPbyEmail)
router.post('/otp/confirm', verifyEmailOTP)
router.post('/verify', otpUser)

module.exports = router;
