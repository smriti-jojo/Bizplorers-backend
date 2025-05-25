const Buyer = require('../models/buyer');

exports.fillBuyerDetails = async (req, res) => {
  try {
    const exists = await Buyer.findOne({ where: { userId: req.user.id } });
    if (exists) return res.status(400).json({ error: 'Buyer details already filled' });

    const buyer = await Buyer.create({ ...req.body, userId: req.user.id });
    res.status(201).json(buyer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBuyerDetails = async (req, res) => {
  try {
    const buyer = await Buyer.findOne({ where: { userId: req.user.id } });
    if (!buyer) return res.status(404).json({ error: 'No buyer details found' });
    res.status(200).json(buyer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBuyerDetails = async (req, res) => {
  try {
    const buyer = await Buyer.findOne({ where: { userId: req.user.id } });
    if (!buyer) return res.status(404).json({ error: 'No buyer details found' });

    await buyer.update(req.body);
    res.status(200).json(buyer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
