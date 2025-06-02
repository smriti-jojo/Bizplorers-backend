const userRoutes=require('../controllers/userController');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// POST /seller - Create seller profile
// router.post("/add_User", auth, sellerController.createSeller);

// GET /seller - Get seller profile
router.get("/getAllUsers", auth, userController.getAllUsers);

// PUT /seller - Update seller profile
// router.put("/update_detail", auth, sellerController.updateSeller);

// router.get("/getAllSeller/:brokerId", auth, sellerController.getSellersByBrokerId);

module.exports = router;
