const { Interest, User } = require('../models');

exports.sendInterest = async (req, res) => {
  const { senderId, receiverId, type } = req.body;

  if (!['interest', 'invite'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  try {
    const interest = await Interest.create({ senderId, receiverId, type });
    return res.status(201).json({ message: `${type} sent successfully`, interest });
  } catch (error) {
    console.error('Error sending interest:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};