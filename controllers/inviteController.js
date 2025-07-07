const { Invite, User } = require('../models');
const sendOTP = require('../utils/sendOTP');

exports.sendInvite = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const sender = await User.findByPk(senderId);
    const receiver = await User.findByPk(receiverId);

    if (!sender || !receiver)
      return res.status(404).json({ error: 'User not found' });

    const invite = await Invite.create({ senderId, receiverId });

    const msg = `Hi ${receiver.name},\n\nYou have received a new **invite** from ${sender.name}.`;
    const subject = `You've received a new invite`;

    await sendOTP(receiver.email, null, msg, subject);
    return res.status(201).json({ message: 'Invite sent', invite });
  } catch (err) {
    return res.status(500).json({ error: 'Error sending invite' });
  }
};

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
