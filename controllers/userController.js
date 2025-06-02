const User=require('../models/user');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // You can also add attributes if needed
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
