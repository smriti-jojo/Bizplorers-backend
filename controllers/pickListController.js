// // const PicklistCategory =require('../models/pickListCategory');
// // const PicklistValue  =require('../models/pickListValue');
// const { PicklistCategory, PicklistValue } = require('../models');

// // 📥 Add a new value
// exports.addValue = async (req, res) => {
//   try {
//     const { category, value } = req.body;
//     if (!category || !value) return res.status(400).json({ message: "Missing fields." });

//     let categoryObj = await PicklistCategory.findOne({ where: { name: category } });
//     if (!categoryObj) {
//       categoryObj = await PicklistCategory.create({ name: category });
//     }

//     const [picklistValue, created] = await PicklistValue.findOrCreate({
//       where: {
//         category_id: categoryObj.id,
//         value
//       },
//       defaults: { is_active: true }
//     });

//     if (!created) {
//       // Reactivate if previously soft deleted
//       picklistValue.is_active = true;
//       await picklistValue.save();
//     }

//     return res.status(200).json({ message: 'Value added/activated.', data: picklistValue });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

// // 🔍 Get values by category
// exports.getValuesByCategory = async (req, res) => {
//   const { category } = req.query;
//   if (!category) return res.status(400).json({ message: 'Category required' });

//   const categoryObj = await PicklistCategory.findOne({ where: { name: category } });
//   if (!categoryObj) return res.status(404).json({ message: 'Category not found' });

//   const values = await PicklistValue.findAll({
//     where: { category_id: categoryObj.id ,is_active: true},
//     order: [['value', 'ASC']]
//   });

//   return res.json(values);
// };

// // Assuming PicklistCategory and PicklistValue models are already imported

// exports.addMultiplePicklistValues = async (req, res) => {
//   try {
//     const { picklists } = req.body;

//     if (!picklists || typeof picklists !== 'object' || Object.keys(picklists).length === 0) {
//       return res.status(400).json({ message: 'Picklists data required.' });
//     }

//     const results = {};

//     // Loop over each category (key) in picklists object
//     for (const [categoryName, values] of Object.entries(picklists)) {
//       if (!Array.isArray(values) || values.length === 0) {
//         // Skip empty or invalid arrays
//         continue;
//       }

//       // Find or create the category
//       let category = await PicklistCategory.findOne({ where: { name: categoryName } });
//       if (!category) {
//         category = await PicklistCategory.create({ name: categoryName });
//       }

//       results[categoryName] = [];

//       // Loop over unique values only
//       const uniqueValues = [...new Set(values)];

//       for (const value of uniqueValues) {
//         // Use findOrCreate to avoid duplicates
//         const [picklistValue, created] = await PicklistValue.findOrCreate({
//           where: {
//             category_id: category.id,
//             value,
//           },
//           defaults: {
//             is_active: true,
//           },
//         });

//         // If already existed but inactive, reactivate it
//         if (!created && !picklistValue.is_active) {
//           picklistValue.is_active = true;
//           await picklistValue.save();
//         }

//         results[categoryName].push({
//           id: picklistValue.id,
//           value: picklistValue.value,
//           is_active: picklistValue.is_active,
//           created: created,
//         });
//       }
//     }

//     res.status(200).json({ message: 'Picklist values added/updated.', data: results });
//   } catch (error) {
//     console.error('Error in addMultiplePicklistValues:', error);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };


// // Soft Delete
// exports.deactivateValue = async (req, res) => {
//   const { id } = req.body;
//   const value = await PicklistValue.findByPk(id);
//   if (!value) return res.status(404).json({ message: 'Value not found' });

//   value.is_active = false;
//   await value.save();
//   res.json({ message: 'Value deactivated.' });
// };

// //Hard Delete
// exports.hardDeleteValue = async (req, res) => {
//   const { id } = req.params;
//   const value = await PicklistValue.findByPk(id);
//   if (!value) return res.status(404).json({ message: 'Value not found' });

//   await value.destroy();
//   res.json({ message: 'Value permanently deleted.' });
// };


// // ✏️ Update value
// exports.updateValue = async (req, res) => {
//   const { id, new_value } = req.body;
//   const value = await PicklistValue.findByPk(id);
//   if (!value) return res.status(404).json({ message: 'Value not found' });

//   value.value = new_value;
//   await value.save();
//   res.json({ message: 'Value updated.', value });
// };

// // 📄 Get all categories
// exports.getCategories = async (req, res) => {
//   const categories = await PicklistCategory.findAll({ order: [['name', 'ASC']] });
//   res.json(categories);
// };

// // get all value in admin screen
// exports.getAllPicklists = async (req, res) => {
//   try {
//     const picklistValues = await PicklistValue.findAll({
//       include: {
//         model: PicklistCategory,
//         attributes: ['name'],
//       },
//       order: [['category_id', 'ASC']],
//     });

//     const grouped = {};
//     picklistValues.forEach((item) => {
//       const categoryName = item.PicklistCategory.name;
//       if (!grouped[categoryName]) grouped[categoryName] = [];

//       grouped[categoryName].push({
//         id: item.id,
//         name: item.value,
//         active: item.is_active,
//       });
//     });

//     res.status(200).json({ data: grouped });
//   } catch (error) {
//     console.error("Error fetching picklists:", error);
//     res.status(500).json({ message: 'Server error while fetching picklists.' });
//   }
// };

// //toggle
// exports.togglePicklistValue = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const picklistValue = await PicklistValue.findByPk(id);
//     if (!picklistValue) return res.status(404).json({ message: 'Value not found.' });

//     picklistValue.is_active = !picklistValue.is_active;
//     await picklistValue.save();

//     res.status(200).json({
//       message: `Value ${picklistValue.is_active ? 'activated' : 'deactivated'} successfully.`,
//       data: picklistValue
//     });
//   } catch (err) {
//     console.error("Error toggling value:", err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

// // Get States by Country ID
// exports.getStatesByCountry = async (req, res) => {
//   try {
//     const { countryId } = req.query;
//     if (!countryId) return res.status(400).json({ message: 'countryId is required' });

//     const stateCategory = await PicklistCategory.findOne({ where: { name: 'Business Location Preference State' } });
//     if (!stateCategory) return res.status(404).json({ message: 'State category not found' });

//     const states = await PicklistValue.findAll({
//       where: {
//         category_id: stateCategory.id,
//         parent_id: countryId,
//         is_active: true,
//       },
//       order: [['value', 'ASC']],
//     });

//     res.json(states);
//   } catch (err) {
//     console.error('Error fetching states:', err);
//     res.status(500).json({ message: 'Server error while fetching states.' });
//   }
// };

// // Get Cities by State ID
// exports.getCitiesByState = async (req, res) => {
//   try {
//     const { stateId } = req.query;
//     if (!stateId) return res.status(400).json({ message: 'stateId is required' });

//     const cityCategory = await PicklistCategory.findOne({ where: { name: 'Business Location Preference City' } });
//     if (!cityCategory) return res.status(404).json({ message: 'City category not found' });

//     const cities = await PicklistValue.findAll({
//       where: {
//         category_id: cityCategory.id,
//         parent_id: stateId,
//         is_active: true,
//       },
//       order: [['value', 'ASC']],
//     });

//     res.json(cities);
//   } catch (err) {
//     console.error('Error fetching cities:', err);
//     res.status(500).json({ message: 'Server error while fetching cities.' });
//   }
// };
const { PicklistCategory, PicklistValue } = require('../models');

// 📥 Add a new picklist value
exports.addValue = async (req, res) => {
  try {
    const { category, value, parent_id = null } = req.body;
    if (!category || !value) return res.status(400).json({ message: "Missing fields." });

    let categoryObj = await PicklistCategory.findOne({ where: { name: category } });
    if (!categoryObj) {
      categoryObj = await PicklistCategory.create({ name: category });
    }

    const [picklistValue, created] = await PicklistValue.findOrCreate({
      where: {
        category_id: categoryObj.id,
        value,
        parent_id,
      },
      defaults: { is_active: true }
    });

    if (!created && !picklistValue.is_active) {
      picklistValue.is_active = true;
      await picklistValue.save();
    }

    return res.status(200).json({ message: 'Value added/activated.', data: picklistValue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// 🔍 Get all values by category name
exports.getValuesByCategory = async (req, res) => {
  const { category } = req.query;
  if (!category) return res.status(400).json({ message: 'Category required' });

  const categoryObj = await PicklistCategory.findOne({ where: { name: category } });
  if (!categoryObj) return res.status(404).json({ message: 'Category not found' });

  const values = await PicklistValue.findAll({
    where: { category_id: categoryObj.id, is_active: true },
    order: [['value', 'ASC']],
  });

  return res.json(values);
};

exports.addMultiplePicklistValues = async (req, res) => {
  try {
    const { picklists } = req.body;

    if (!picklists || typeof picklists !== 'object' || Object.keys(picklists).length === 0) {
      return res.status(400).json({ message: 'Picklists data required.' });
    }

    const results = {};

    for (const [categoryName, values] of Object.entries(picklists)) {
      if (!Array.isArray(values) || values.length === 0) continue;

      // Get or create category
      let category = await PicklistCategory.findOne({ where: { name: categoryName } });
      if (!category) {
        category = await PicklistCategory.create({ name: categoryName });
      }

      results[categoryName] = [];

      for (const entry of values) {
        const value = typeof entry === 'string' ? entry : entry.value;
        const parentId = typeof entry === 'object' ? entry.parent_id : null;

        // 🔍 Check if this value already exists with the same parent and category
        let existingValue = await PicklistValue.findOne({
          where: {
            value,
            category_id: category.id,
            parent_id: parentId || null,
          },
        });

        // ♻️ Reactivate if inactive
        if (existingValue) {
          if (!existingValue.is_active) {
            existingValue.is_active = true;
            await existingValue.save();
          }

          results[categoryName].push({
            id: existingValue.id,
            value: existingValue.value,
            is_active: existingValue.is_active,
            created: false,
          });
          continue;
        }

        // 🆕 If not found, create
        const newValue = await PicklistValue.create({
          value,
          category_id: category.id,
          parent_id: parentId || null,
          is_active: true,
        });

        results[categoryName].push({
          id: newValue.id,
          value: newValue.value,
          is_active: newValue.is_active,
          created: true,
        });
      }
    }

    return res.status(200).json({ message: 'Picklist values added/updated.', data: results });

  } catch (error) {
    console.error('Error in addMultiplePicklistValues:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};


// ❌ Soft delete (deactivate)
exports.deactivateValue = async (req, res) => {
  const { id } = req.body;
  const value = await PicklistValue.findByPk(id);
  if (!value) return res.status(404).json({ message: 'Value not found' });

  value.is_active = false;
  await value.save();
  res.json({ message: 'Value deactivated.' });
};

// 💀 Hard delete
exports.hardDeleteValue = async (req, res) => {
  const { id } = req.params;
  const value = await PicklistValue.findByPk(id);
  if (!value) return res.status(404).json({ message: 'Value not found' });

  await value.destroy();
  res.json({ message: 'Value permanently deleted.' });
};

// ✏️ Update value
exports.updateValue = async (req, res) => {
  const { id, new_value } = req.body;
  const value = await PicklistValue.findByPk(id);
  if (!value) return res.status(404).json({ message: 'Value not found' });

  value.value = new_value;
  await value.save();
  res.json({ message: 'Value updated.', value });
};

// 📄 Get all picklist categories
exports.getCategories = async (req, res) => {
  const categories = await PicklistCategory.findAll({ order: [['name', 'ASC']] });
  res.json(categories);
};

// 📋 Get all picklists (admin grouped view)
exports.getAllPicklists = async (req, res) => {
  try {
    const picklistValues = await PicklistValue.findAll({
      include: {
        model: PicklistCategory,
        attributes: ['name'],
      },
      order: [['category_id', 'ASC']],
    });

    const grouped = {};
    picklistValues.forEach((item) => {
      const categoryName = item.PicklistCategory.name;
      if (!grouped[categoryName]) grouped[categoryName] = [];

      grouped[categoryName].push({
        id: item.id,
        name: item.value,
        active: item.is_active,
        parent_id: item.parent_id,
      });
    });

    res.status(200).json({ data: grouped });
  } catch (error) {
    console.error("Error fetching picklists:", error);
    res.status(500).json({ message: 'Server error while fetching picklists.' });
  }
};

// 🔁 Toggle active/inactive
exports.togglePicklistValue = async (req, res) => {
  try {
    const { id } = req.params;
    const picklistValue = await PicklistValue.findByPk(id);
    if (!picklistValue) return res.status(404).json({ message: 'Value not found.' });

    picklistValue.is_active = !picklistValue.is_active;
    await picklistValue.save();

    res.status(200).json({
      message: `Value ${picklistValue.is_active ? 'activated' : 'deactivated'} successfully.`,
      data: picklistValue
    });
  } catch (err) {
    console.error("Error toggling value:", err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// 🌍 Get states by countryId (for seller)
exports.getStatesByCountry = async (req, res) => {
  try {
    const { countryId } = req.query;
    if (!countryId) return res.status(400).json({ message: 'countryId is required' });

    const stateCategory = await PicklistCategory.findOne({ where: { name: 'Business Location Preference State' } });
    if (!stateCategory) return res.status(404).json({ message: 'State category not found' });

    const states = await PicklistValue.findAll({
      where: {
        category_id: stateCategory.id,
        parent_id: countryId,
        is_active: true,
      },
      order: [['value', 'ASC']],
    });

    res.json(states);
  } catch (err) {
    console.error('Error fetching states:', err);
    res.status(500).json({ message: 'Server error while fetching states.' });
  }
};

// 🏙️ Get cities by stateId (for seller)
exports.getCitiesByState = async (req, res) => {
  try {
    const { stateId } = req.query;
    if (!stateId) return res.status(400).json({ message: 'stateId is required' });

    const cityCategory = await PicklistCategory.findOne({ where: { name: 'Business Location Preference City' } });
    if (!cityCategory) return res.status(404).json({ message: 'City category not found' });

    const cities = await PicklistValue.findAll({
      where: {
        category_id: cityCategory.id,
        parent_id: stateId,
        is_active: true,
      },
      order: [['value', 'ASC']],
    });

    res.json(cities);
  } catch (err) {
    console.error('Error fetching cities:', err);
    res.status(500).json({ message: 'Server error while fetching cities.' });
  }
};

// 🧑‍💼 Get cities by countryId (for buyer)
exports.getBuyerCitiesByCountry = async (req, res) => {
  try {
    const { countryId } = req.query;
    if (!countryId) return res.status(400).json({ message: 'countryId is required' });

    const cityCategory = await PicklistCategory.findOne({ where: { name: 'Buyer Location City' } });
    if (!cityCategory) return res.status(404).json({ message: 'Buyer City category not found' });

    const cities = await PicklistValue.findAll({
      where: {
        category_id: cityCategory.id,
        parent_id: countryId,
        is_active: true,
      },
      order: [['value', 'ASC']],
    });

    res.json(cities);
  } catch (err) {
    console.error('Error fetching buyer cities:', err);
    res.status(500).json({ message: 'Server error while fetching buyer cities.' });
  }
};
