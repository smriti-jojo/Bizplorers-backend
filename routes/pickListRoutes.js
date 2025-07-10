// const express = require('express');
// const router = express.Router();
// const controller = require('../controllers/pickListController');
// const auth =require('../middleware/adminMiddleware');

// router.post('/add_value',auth, controller.addValue);
// router.get('/get_value',auth, controller.getValuesByCategory);
// router.patch('/deactivate',auth, controller.deactivateValue);
// router.put('/update_value',auth, controller.updateValue);
// router.get('/categories', auth, controller.getCategories);
// router.post('/multiple_add_value',auth,controller.addMultiplePicklistValues);
// router.patch('/toggle/:id', auth,controller.togglePicklistValue);
// router.get('/get_all',controller.getAllPicklists);
// router.delete('/delete/:id',auth,controller.hardDeleteValue);

// module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/pickListController');

// Add single value
router.post('/add', controller.addValue);

// Add multiple values
router.post('/add-multiple', controller.addMultiplePicklistValues);

// Get values by category
router.get('/by-category', controller.getValuesByCategory);

// Toggle active/inactive
router.put('/toggle/:id', controller.togglePicklistValue);

// Deactivate (soft delete)
router.put('/deactivate', controller.deactivateValue);

// Hard delete
router.delete('/delete/:id', controller.hardDeleteValue);

// Update value
router.put('/update', controller.updateValue);

// Get all categories
router.get('/categories', controller.getCategories);

// Admin: Get all picklists grouped
router.get('/admin/all', controller.getAllPicklists);

// Get states by country
router.get('/states', controller.getStatesByCountry);

// Get cities by state
router.get('/cities', controller.getCitiesByState);

// Get buyer cities by country
router.get('/buyer-cities', controller.getBuyerCitiesByCountry);

module.exports = router;
