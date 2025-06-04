const express = require('express');
const router = express.Router();
const controller = require('../controllers/pickListController');
const auth =require('../middleware/adminMiddleware');

router.post('/add_value',auth, controller.addValue);
router.get('/get_value',auth, controller.getValuesByCategory);
router.patch('/deactivate',auth, controller.deactivateValue);
router.put('/update_value',auth, controller.updateValue);
router.get('/categories', auth, controller.getCategories);
router.post('/multiple_add_value',auth,controller.addMultiplePicklistValues);
router.patch('/toggle/:id', auth,controller.togglePicklistValue);
router.get('/get_all',auth,controller.getAllPicklists);
router.get('/delete',auth,controller.hardDeleteValue);

module.exports = router;
