const express = require('express');
const {
  fillBrokerDetails,
  getBrokerDetails,
  updateBrokerDetails,
} = require('../controllers/brokerController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add_detail', auth, fillBrokerDetails);     // Fill in buyer details
router.get('/getBroker', auth, getBrokerDetails);       // Get buyer details
router.put('/updateBroker', auth,updateBrokerDetails);    // Update buyer details

module.exports = router;
