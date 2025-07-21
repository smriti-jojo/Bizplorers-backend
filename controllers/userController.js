const { User, Seller,Buyer,Broker,Interest, Invite } = require('../models');
const { Op } = require('sequelize');

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

// exports.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
// console.log("id---",id);
//     const user = await User.findByPk(id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//      // Manually delete all dependent records
//      const userId = user.id;
//     await Interest.destroy({
//       where: {
//         [Op.or]: [{ senderId: userId }, { receiverId: userId }],
//       },
//     });

//     await Invite.destroy({
//       where: {
//         [Op.or]: [{ senderId: userId }, { receiverId: userId }],
//       },
//     });

//     // await user.destroy(); // Soft delete
//     await user.destroy({ force: true }); // Hard delete

//     res.status(200).json({ message: 'User soft-deleted successfully' });
//   } catch (error) {
//     console.error('Error soft deleting user:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
// exports.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id) return res.status(400).json({ message: 'User ID is required' });

//     console.log("Deleting user with id:", id);
//     const user = await User.findByPk(id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const userId = user.id;

//     const interestDeleted = await Interest.destroy({
//       where: {
//         [Op.or]: [{ senderId: userId }, { receiverId: userId }],
//       },
//     });
//     console.log("Deleted interests:", interestDeleted);

//     const inviteDeleted = await Invite.destroy({
//       where: {
//         [Op.or]: [{ senderId: userId }, { receiverId: userId }],
//       },
//     });
//     console.log("Deleted invites:", inviteDeleted);

//     await user.destroy({ force: true }); // Hard delete
//     res.status(200).json({ message: 'User permanently deleted successfully' });

//   } catch (error) {
//     console.error('Error hard deleting user:', error.message);
//     console.error(error.stack);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'User ID is required' });

    console.log("Deleting user with id:", id);
    const user = await User.findByPk(id);
    console.log("user--detail----",user);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userId = user.id;
     console.log("user--id----",user.id);
     console.log("userId----",userId);

    const interests = await Interest.findAll({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
       force: true,
    });
    console.log("Interests to delete:", interests.length);

    await Interest.destroy({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
      force: true, // ensure hard delete if model is paranoid
    });

    await Invite.destroy({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
      force: true,
    });

    await user.destroy({ force: true });

    res.status(200).json({ message: 'User permanently deleted successfully' });
  } catch (error) {
    console.error('Error hard deleting user:', error.message);
    console.error(error.stack);
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

// exports.getBrokersWithBuyersAndSellers = async (req, res) => {
//   try {
//     const brokers = await User.findAll({
//       where: { role: 'broker' },
//       attributes: ['id','name', 'email'], // adjust based on your fields
//       include: [
//         {
//           model: Seller,
//           as: 'sellers',
//           attributes: ['id', 'company_name', 'city', 'state', 'status'], // adjust
//         },
//         {
//           model: Buyer,
//           as: 'buyers',
//           attributes: ['id', 'designation', 'ticketSizeMin', 'ticketSizeMax'], // adjust
//         }
//       ]
//     });

//     res.status(200).json(brokers);
//   } catch (err) {
//     console.error('Error fetching brokers:', err);
//     res.status(500).json({ message: 'Server error while fetching brokers' });
//   }
// };

exports.getBrokersWithBuyersAndSellers = async (req, res) => {
  try {
    // const brokers = await User.findAll({
    //   where: { role: 'broker' },
    //   attributes: ['id', 'name', 'email'], // correct broker-level fields
    //   include: [
    //     {
    //       model: Seller,
    //       as: 'sellers',
    //       attributes: ['id', 'company_name', 'city', 'state', 'status'],
    //     },
    //     {
    //       model: Buyer,
    //       as: 'buyers',
    //       attributes: ['id', 'designation', 'ticketSizeMin', 'ticketSizeMax'],
    //     }
    //   ]
    // });

    const brokers = await User.findAll({
  where: { role: 'broker' },
  attributes: ['id', 'name', 'email'],
  include: [
    {
      model: Seller,
      as: 'sellers',
      attributes: ['id', 'company_name', 'city', 'state', 'status'],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      ]
    },
    {
      model: Buyer,
      as: 'buyers',
      attributes: ['id', 'designation', 'ticketSizeMin', 'ticketSizeMax'],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      ]
    }
  ]
});

    res.status(200).json(brokers);
  } catch (err) {
    console.error('Error fetching brokers:', err);
    res.status(500).json({ message: 'Server error while fetching brokers' });
  }
};



// Admin: Fetch all sent interests with user info
exports.getAllSentInterests = async (req, res) => {
  try {
    const interests = await Interest.findAll({
      include: [
        { model: User, as: 'sender', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'receiver', attributes: ['id', 'name', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ interests });
  } catch (error) {
    console.error('Error fetching sent interests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Admin: Fetch all received invites with user info
exports.getAllReceivedInvites = async (req, res) => {
  try {
    const invites = await Invite.findAll({
      include: [
        { model: User, as: 'sender', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'receiver', attributes: ['id', 'name', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ invites });
  } catch (error) {
    console.error('Error fetching received invites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
