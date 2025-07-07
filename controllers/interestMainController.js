const { Interest, User } = require('../models');
const sendOTP = require('../utils/sendOTP');

exports.sendInterest = async (req, res) => {
  const { senderId, receiverId } = req.body;

  console.log("senderId----",senderId);
   console.log("receiverId----",receiverId);
  try {
    const sender = await User.findByPk(senderId);
    const receiver = await User.findByPk(receiverId);

     console.log("sender----",sender);
   console.log("receiver----",receiver);

    if (!sender || !receiver)
      return res.status(404).json({ error: 'User not found' });

    const interest = await Interest.create({ senderId, receiverId });

    const msg = `Hi ${receiver.name},\n\nYou have received a new **interest** from ${sender.name}.`;
    const subject = `You've received a new interest`;

    await sendOTP(receiver.email, null, msg, subject);
    return res.status(201).json({ message: 'Interest sent', interest });
  } catch (err) {
    return res.status(500).json({ error: 'Error sending interest' });
  }
};

exports.getAllInterests = async (req, res) => {
  try {
    const interests = await Interest.findAll({
      include: [
        { model: User, as: 'sender', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'receiver', attributes: ['id', 'name', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(interests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch interests' });
  }
};
