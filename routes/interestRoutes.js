const express = require('express');
const router = express.Router();
const { sendInterest } = require('../controllers/InterestController');

router.post('/send', sendInterest);

module.exports = router;