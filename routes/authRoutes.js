const express = require('express');
const { register, verifyOtp, login,sendResetOtp,resetPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
// router.post('/reset-password', authController.resetPassword);
router.post('/send-reset-otp',sendResetOtp);
router.post('/reset-password', resetPassword);


module.exports = router;
