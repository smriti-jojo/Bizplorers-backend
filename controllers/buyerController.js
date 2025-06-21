// const Buyer = require('../models/buyer');
// const Seller=require('../models/seller');
// const Broker=require('../models/broker');

// const { Buyer, User,Seller,Broker } = require('../models');
const { User, Seller,Buyer,Broker } = require('../models');

// controllers/buyerController.js
// const { Buyer, User } = require('../models');

exports.fillBuyerDetails = async (req, res) => {
  try {
    // Confirm user exists first
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if buyer profile already exists
    const exists = await Buyer.findOne({ where: { userId: req.user.id } });
    if (exists) return res.status(400).json({ error: 'Buyer profile already filled' });

    const payload = { ...req.body, userId: req.user.id };

    if (req.user.role === 'broker') {
      payload.brokerId = req.user.id;
    }

    const buyer = await Buyer.create(payload);
    res.status(201).json(buyer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// exports.fillBuyerDetails = async (req, res) => {
//   try {
//     const exists = await Buyer.findOne({ where: { userId: req.user.id } });
//     if (exists) return res.status(400).json({ error: 'Buyer details already filled' });

//     let payload = { ...req.body, userId: req.user.id };

//     // Allow broker to attach brokerId only if they are creating
//     if (req.user.role === 'broker' && req.body.brokerId) {
//       payload.brokerId = req.body.brokerId;
//     }

//     const buyer = await Buyer.create(payload);
//     res.status(201).json(buyer);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.fillBuyerDetails = async (req, res) => {
//   try {
//     const existingSeller = await Seller.findOne({ where: { userId: req.user.id } });
//     const existingBuyer = await Buyer.findOne({ where: { userId: req.user.id } });
//     const existingBroker = await Broker.findOne({ where: { userId: req.user.id } });

//     if (existingSeller || existingBuyer || existingBroker) {
//       return res.status(400).json({ message: "You already have a profile as Buyer, Seller, or Broker." });
//     }

//     let payload = { ...req.body, userId: req.user.id };

    
//     if (req.user.role === 'broker' && req.body.brokerId) {
//       payload.brokerId = req.body.brokerId;
//     }

//     const buyer = await Buyer.create(payload);
//     res.status(201).json(buyer);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

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

exports.getBuyersByBrokerId = async (req, res) => {
  const { brokerId } = req.params;

  try {
    const buyers = await Buyer.findAll({
      where: {
        brokerId: brokerId
      }
    });

     if (buyers.length === 0) {
      return res.status(404).json({ message: 'No Buyers found for this broker.' });
    }
    return res.status(200).json(buyers);
  } catch (error) {
    console.error('Error fetching buyers:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET: Fetch all buyer profiles (admin/general access)
exports.getAllBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.findAll();
    if (!buyers || buyers.length === 0) {
      return res.status(404).json({ message: "No buyers found." });
    }
    res.status(200).json(buyers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
