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
//done
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
router.post('/update', controller.updateValue);

// Get all categories
//done
router.get('/categories', controller.getCategories);

// Admin: Get all picklists grouped
//done
router.get('/admin/all', controller.getAllPicklists);

// Get states by country
//done
router.get('/states', controller.getStatesByCountry);

// Get cities by state
//done
router.get('/cities', controller.getCitiesByState);
//done
router.get('/all-categories-values', controller.getAllPicklistCategoriesWithValues);

// Get buyer cities by country
//done
router.get('/buyer-cities', controller.getBuyerCitiesByCountry);

module.exports = router;
