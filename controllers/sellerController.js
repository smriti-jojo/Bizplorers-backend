const  Seller = require("../models/seller");
const Buyer=require('../models/buyer');
const  Broker=require('../models/broker');

//POST: Create seller profile
exports.createSeller = async (req, res) => {
  try {
    const existing = await Seller.findOne({ where: { userId: req.user.id } });
    if (existing) {
      return res.status(400).json({ message: "Seller profile already exists." });
    }
   const payload = { ...req.body, userId: req.user.id };

    // Optional: allow broker to create seller on behalf of someone else
    // if (req.user.role === 'broker' && req.body.brokerId) {
    //   payload.brokerId = req.body.brokerId;
    // }
        if (req.user.role === 'broker') {
  payload.brokerId = req.user.id;
}
    const seller = await Seller.create(payload);
    res.status(201).json(seller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// exports.createSeller = async (req, res) => {
//   try {
//     const existing = await Seller.findOne({ where: { userId: req.user.id } });
//     if (existing) {
//       return res.status(400).json({ message: "Seller profile already exists." });
//     }

//     let payload = { ...req.body, userId: req.user.id };

//     if (req.user.role === 'broker' && req.body.brokerId) {
//       payload.brokerId = req.body.brokerId;
//     }

//     const seller = await Seller.create(payload);
//     res.status(201).json(seller);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.createSeller = async (req, res) => {
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

//     const seller = await Seller.create(payload);
//     res.status(201).json(seller);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };


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

exports.getSellersByBrokerId = async (req, res) => {
  const { brokerId } = req.params;

  try {
    const sellers = await Seller.findAll({
      where: {
        brokerId: brokerId
      }
    });

    return res.status(200).json(sellers);
  } catch (error) {
    console.error('Error fetching buyers:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

