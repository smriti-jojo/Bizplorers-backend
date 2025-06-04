const PicklistCategory =require('../models/pickListCategory');
const PicklistValue  =require('../models/pickListValue');

// 📥 Add a new value
exports.addValue = async (req, res) => {
  try {
    const { category, value } = req.body;
    if (!category || !value) return res.status(400).json({ message: "Missing fields." });

    let categoryObj = await PicklistCategory.findOne({ where: { name: category } });
    if (!categoryObj) {
      categoryObj = await PicklistCategory.create({ name: category });
    }

    const [picklistValue, created] = await PicklistValue.findOrCreate({
      where: {
        category_id: categoryObj.id,
        value
      },
      defaults: { is_active: true }
    });

    if (!created) {
      // Reactivate if previously soft deleted
      picklistValue.is_active = true;
      await picklistValue.save();
    }

    return res.status(200).json({ message: 'Value added/activated.', data: picklistValue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// 🔍 Get values by category
exports.getValuesByCategory = async (req, res) => {
  const { category } = req.query;
  if (!category) return res.status(400).json({ message: 'Category required' });

  const categoryObj = await PicklistCategory.findOne({ where: { name: category } });
  if (!categoryObj) return res.status(404).json({ message: 'Category not found' });

  const values = await PicklistValue.findAll({
    where: { category_id: categoryObj.id ,is_active: true},
    order: [['value', 'ASC']]
  });

  return res.json(values);
};

// Assuming PicklistCategory and PicklistValue models are already imported

exports.addMultiplePicklistValues = async (req, res) => {
  try {
    const { picklists } = req.body;

    if (!picklists || typeof picklists !== 'object' || Object.keys(picklists).length === 0) {
      return res.status(400).json({ message: 'Picklists data required.' });
    }

    const results = {};

    // Loop over each category (key) in picklists object
    for (const [categoryName, values] of Object.entries(picklists)) {
      if (!Array.isArray(values) || values.length === 0) {
        // Skip empty or invalid arrays
        continue;
      }

      // Find or create the category
      let category = await PicklistCategory.findOne({ where: { name: categoryName } });
      if (!category) {
        category = await PicklistCategory.create({ name: categoryName });
      }

      results[categoryName] = [];

      // Loop over unique values only
      const uniqueValues = [...new Set(values)];

      for (const value of uniqueValues) {
        // Use findOrCreate to avoid duplicates
        const [picklistValue, created] = await PicklistValue.findOrCreate({
          where: {
            category_id: category.id,
            value,
          },
          defaults: {
            is_active: true,
          },
        });

        // If already existed but inactive, reactivate it
        if (!created && !picklistValue.is_active) {
          picklistValue.is_active = true;
          await picklistValue.save();
        }

        results[categoryName].push({
          id: picklistValue.id,
          value: picklistValue.value,
          is_active: picklistValue.is_active,
          created: created,
        });
      }
    }

    res.status(200).json({ message: 'Picklist values added/updated.', data: results });
  } catch (error) {
    console.error('Error in addMultiplePicklistValues:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};


// Soft Delete
exports.deactivateValue = async (req, res) => {
  const { id } = req.body;
  const value = await PicklistValue.findByPk(id);
  if (!value) return res.status(404).json({ message: 'Value not found' });

  value.is_active = false;
  await value.save();
  res.json({ message: 'Value deactivated.' });
};

//Hard Delete
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

// 📄 Get all categories
exports.getCategories = async (req, res) => {
  const categories = await PicklistCategory.findAll({ order: [['name', 'ASC']] });
  res.json(categories);
};

// get all value in admin screen
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
      });
    });

    res.status(200).json({ data: grouped });
  } catch (error) {
    console.error("Error fetching picklists:", error);
    res.status(500).json({ message: 'Server error while fetching picklists.' });
  }
};

//toggle
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
