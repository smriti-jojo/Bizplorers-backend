const { User, Seller,Buyer,Broker } = require('../models');

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll(); // You can also add attributes if needed
//     res.status(200).json({ success: true, data: users });
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
       include: [Seller, Buyer, Broker],
    });

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update(updates);
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy(); // Soft delete
    res.status(200).json({ message: 'User soft-deleted successfully' });
  } catch (error) {
    console.error('Error soft deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.listDeletedUsers = async (req, res) => {
  try {
    const deletedUsers = await User.findAll({ where: {}, paranoid: false });
    const softDeleted = deletedUsers.filter(user => user.deletedAt !== null);
    res.status(200).json(softDeleted);
  } catch (error) {
    console.error('Error fetching soft-deleted users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/users/restore/:id - Optional: Restore soft-deleted user
exports.restoreUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, { paranoid: false });
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.restore();
    res.status(200).json({ message: 'User restored successfully' });
  } catch (error) {
    console.error('Error restoring user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateComment=async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.comment = comment;
    await user.save();

    res.json({ message: 'Comment updated', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;

    if (!role) {
      return res.status(400).json({ error: 'Role is required' });
    }

    const users = await User.findAll({
      where: { role },
      attributes: ['id', 'name', 'role'] // adjust attributes as needed
    });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users by role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getBrokersWithBuyersAndSellers = async (req, res) => {
  try {
    const brokers = await User.findAll({
      where: { role: 'broker' },
      attributes: ['id','name', 'email'], // adjust based on your fields
      include: [
        {
          model: Seller,
          as: 'sellers',
          attributes: ['id', 'company_name', 'city', 'state', 'status'], // adjust
        },
        {
          model: Buyer,
          as: 'buyers',
          attributes: ['id', 'designation', 'ticketSizeMin', 'ticketSizeMax'], // adjust
        }
      ]
    });

    res.status(200).json(brokers);
  } catch (err) {
    console.error('Error fetching brokers:', err);
    res.status(500).json({ message: 'Server error while fetching brokers' });
  }
};