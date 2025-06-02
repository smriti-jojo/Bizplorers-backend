const express = require('express');
const router = express.Router();
const controller = require('../controllers/pickListController');
const auth =require('../middleware/authMiddleware');

router.post('/add_value',auth, controller.addValue);
router.get('/get_value',auth, controller.getValuesByCategory);
router.patch('/deactivate',auth, controller.deactivateValue);
router.put('/update_value',auth, controller.updateValue);
router.get('/categories', auth, controller.getCategories);
router.post('/multiple_add_value',auth,controller.addMultiplePicklistValues);

module.exports = router;
