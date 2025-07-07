const { Invite, User } = require('../models');
const sendOTP = require('../utils/sendOTP');
const { Op } = require('sequelize');


exports.sendInvite = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const sender = await User.findByPk(senderId);
    const receiver = await User.findByPk(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found.' });
    }

    // ✅ Role check
    if (sender.role === receiver.role) {
      return res.status(400).json({ error: 'Cannot send invite to same role user.' });
    }

    // ✅ Check last 15 days
    const existing = await Invite.findOne({
      where: {
        senderId,
        receiverId,
        createdAt: {
          [Op.gte]: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
        }
      }
    });

    if (existing) {
      return res.status(400).json({
        error: 'Invite already sent to this user within the last 15 days.'
      });
    }

    const invite = await Invite.create({ senderId, receiverId });

    // ✅ Notify
    const msg = `Hi ${receiver.name},\n\nYou received a new invite from ${sender.name} (${sender.email}).`;
    await sendOTP(receiver.email, null, msg, 'New Invite on Bizplorers');

    return res.status(201).json({ message: 'Invite sent successfully', invite });
  } catch (error) {
    console.error('Invite Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};





// exports.sendInvite = async (req, res) => {
//   const { senderId, receiverId } = req.body;

//   try {
//     const sender = await User.findByPk(senderId);
//     const receiver = await User.findByPk(receiverId);

//     if (!sender || !receiver)
//       return res.status(404).json({ error: 'User not found' });

//     const invite = await Invite.create({ senderId, receiverId });

//     const msg = `Hi ${receiver.name},\n\nYou have received a new **invite** from ${sender.name}.`;
//     const subject = `You've received a new invite`;

//     await sendOTP(receiver.email, null, msg, subject);
//     return res.status(201).json({ message: 'Invite sent', invite });
//   } catch (err) {
//     return res.status(500).json({ error: 'Error sending invite' });
//   }
// };

exports.getAllInvites = async (req, res) => {
  try {
    const invites = await Invite.findAll({
      include: [
        { model: User, as: 'sender', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'receiver', attributes: ['id', 'name', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(invites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch invites' });
  }
};
