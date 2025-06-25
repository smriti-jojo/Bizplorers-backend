const userRoutes=require('../controllers/userController');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/adminMiddleware');
const userController = require('../controllers/userController');

// POST /seller - Create seller profile
// router.post("/add_User", auth, sellerController.createSeller);

// GET /seller - Get seller profile
router.get("/getAllUsers", auth, userController.getAllUsers);

router.put('/:id',auth, userController.updateUser); // update user
router.delete('/:id',auth, userController.deleteUser); // soft delete user
router.get('/deleted/all', auth, userController.listDeletedUsers); // list soft-deleted users
router.post('/restore/:id', auth, userController.restoreUser); // restore soft-deleted user
router.patch('/comment/:id', auth, userController.updateComment);
router.get('/role-based-users',userController.getUsersByRole);
router.get('/brokers-with-buyers-and-sellers',auth,userController.getBrokersWithBuyersAndSellers);


// PUT /seller - Update seller profile
// router.put("/update_detail", auth, sellerController.updateSeller);

// router.get("/getAllSeller/:brokerId", auth, sellerController.getSellersByBrokerId);

module.exports = router;
