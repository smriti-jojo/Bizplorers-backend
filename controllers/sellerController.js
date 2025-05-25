const  Seller = require("../models/seller");

// POST: Create seller profile
exports.createSeller = async (req, res) => {
  try {
    const existing = await Seller.findOne({ where: { userId: req.user.id } });
    if (existing) {
      return res.status(400).json({ message: "Seller profile already exists." });
    }

    const seller = await Seller.create({ ...req.body, userId: req.user.id });
    res.status(201).json(seller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET: Fetch own seller profile
exports.getSeller = async (req, res) => {
  try {
    const seller = await Seller.findOne({ where: { userId: req.user.id } });
    if (!seller) {
      return res.status(404).json({ message: "No seller details found." });
    }

    res.json(seller);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT: Update seller profile
exports.updateSeller = async (req, res) => {
  try {
    const seller = await Seller.findOne({ where: { userId: req.user.id } });
    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found." });
    }

    await seller.update(req.body);
    res.json(seller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
