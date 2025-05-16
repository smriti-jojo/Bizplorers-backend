const express = require('express');
const { register, verifyOtp, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);

module.exports = router;
