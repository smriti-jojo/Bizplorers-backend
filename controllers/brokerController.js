const { User, Seller,Buyer,Broker } = require('../models');

// exports.fillBrokerDetails = async (req, res) => {
//   try {
//     const exists = await Broker.findOne({ where: { userId: req.user.id } });
//     if (exists) return res.status(400).json({ error: 'Broker details already filled' });

//     const broker = await Broker.create({ ...req.body, userId: req.user.id });
//     res.status(201).json(broker);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.fillBrokerDetails= async (req, res) => {
  try {
    const existingSeller = await Seller.findOne({ where: { userId: req.user.id } });
    const existingBuyer = await Buyer.findOne({ where: { userId: req.user.id } });
    const existingBroker = await Broker.findOne({ where: { userId: req.user.id } });

    if (existingSeller || existingBuyer || existingBroker) {
      return res.status(400).json({ message: "You already have a profile as Buyer, Seller, or Broker." });
    }

    let payload = { ...req.body, userId: req.user.id };

    // For brokers, normally they create their own profile only (no "on behalf of")
    // But if you want, you can allow some brokerId logic here as well, depending on your app design

    const broker = await Broker.create(payload);
    res.status(201).json(broker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getBrokerDetails = async (req, res) => {
  try {
    const broker = await Broker.findOne({ where: { userId: req.user.id } });
    if (!broker) return res.status(404).json({ error: 'No Broker details found' });
    res.status(200).json(broker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBrokerDetails = async (req, res) => {
  try {
    const broker = await Broker.findOne({ where: { userId: req.user.id } });
    if (!broker) return res.status(404).json({ error: 'No buyer details found' });

    await broker.update(req.body);
    res.status(200).json(broker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.assignMultipleUsersToBroker = async (req, res) => {
  try {
    const { brokerId, users } = req.body;

    if (!brokerId || !Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const results = [];

    for (const { userId, role } of users) {
      if (!userId || !role) continue;

      if (role === "seller") {
        const seller = await Seller.findOne({ where: { userId } });
        if (seller) {
          await seller.update({ brokerId });
          results.push({ userId, role, status: "updated" });
        } else {
          results.push({ userId, role, status: "not found" });
        }
      } else if (role === "buyer") {
        const buyer = await Buyer.findOne({ where: { userId } });
        if (buyer) {
          await buyer.update({ brokerId });
          results.push({ userId, role, status: "updated" });
        } else {
          results.push({ userId, role, status: "not found" });
        }
      } else {
        results.push({ userId, role, status: "invalid role" });
      }
    }

    return res.status(200).json({
      message: "Users processed",
      results,
    });
  } catch (error) {
    console.error("Error assigning users to broker:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

