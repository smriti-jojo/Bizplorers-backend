const express = require('express');
const {
  fillBuyerDetails,
  getBuyerDetails,
  updateBuyerDetails,
} = require('../controllers/buyerController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add_detail', auth, fillBuyerDetails);     // Fill in buyer details
router.get('/getBuyer', auth, getBuyerDetails);       // Get buyer details
router.put('/updateBuyer', auth, updateBuyerDetails);    // Update buyer details

module.exports = router;
