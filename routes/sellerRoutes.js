const express = require("express");
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const sellerController = require('../controllers/sellerController');

// POST /seller - Create seller profile
router.post("/add_detail", auth, sellerController.createSeller);

// GET /seller - Get seller profile
router.get("/get_detail", auth, sellerController.getSeller);

// PUT /seller - Update seller profile
router.put("/update_detail", auth, sellerController.updateSeller);

router.get("/getAllSeller/:brokerId", auth, sellerController.getSellersByBrokerId);

module.exports = router;
