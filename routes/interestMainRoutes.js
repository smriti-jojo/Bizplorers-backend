const express = require('express');
const router = express.Router();
const { sendInterest, getAllInterests } = require('../controllers/interestMainController');

router.post('/send-interest', sendInterest);
router.get('/admin/interests', getAllInterests);

module.exports = router;
