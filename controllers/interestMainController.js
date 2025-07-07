const { Interest, User } = require('../models');
const sendOTP = require('../utils/sendOTP');
const { Op } = require('sequelize');


exports.sendInterest = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const sender = await User.findByPk(senderId);
    const receiver = await User.findByPk(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found.' });
    }

    if (sender.role === receiver.role) {
      return res.status(400).json({ error: 'Cannot send interest to a user with the same role.' });
    }

    // ✅ Check for existing interest in last 15 days
    const existing = await Interest.findOne({
      where: {
        senderId,
        receiverId,
        createdAt: {
          [Op.gte]: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
        }
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'Interest already sent within last 15 days.' });
    }

    const interest = await Interest.create({ senderId, receiverId });

    const msg = `Hi ${receiver.name},\n\nYou received a new interest from ${sender.name} (${sender.email}).`;
    await sendOTP(receiver.email, null, msg, 'New Interest on Bizplorers');

    return res.status(201).json({ message: 'Interest sent successfully', interest });
  } catch (error) {
    console.error('Error sending interest:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};


// exports.sendInterest = async (req, res) => {
//   const { senderId, receiverId } = req.body;

//   console.log("senderId----",senderId);
//    console.log("receiverId----",receiverId);
//   try {
//     const sender = await User.findByPk(senderId);
//     const receiver = await User.findByPk(receiverId);

//      console.log("sender----",sender);
//    console.log("receiver----",receiver);

//     if (!sender || !receiver)
//       return res.status(404).json({ error: 'User not found' });

//     const interest = await Interest.create({ senderId, receiverId });

//     const msg = `Hi ${receiver.name},\n\nYou have received a new **interest** from ${sender.name}.`;
//     const subject = `You've received a new interest`;

//     await sendOTP(receiver.email, null, msg, subject);
//     return res.status(201).json({ message: 'Interest sent', interest });
//   } catch (err) {
//     return res.status(500).json({ error: 'Error sending interest' });
//   }
// };


// exports.sendInterest = async (req, res) => {
//   const { senderId, receiverId } = req.body;

//   try {
//     const sender = await User.findByPk(senderId);
//     const receiver = await User.findByPk(receiverId);

//     if (!sender || !receiver) {
//       return res.status(404).json({ error: 'Sender or receiver not found.' });
//     }

//     // ✅ Role check
//     if (sender.role === receiver.role) {
//       return res.status(400).json({ error: 'Cannot send interest to same role user.' });
//     }

//     // ✅ Check last 15 days
//     const existing = await Interest.findOne({
//       where: {
//         senderId,
//         receiverId,
//         type: 'interest',
//         createdAt: {
//           [Op.gte]: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
//         }
//       }
//     });

//     if (existing) {
//       return res.status(400).json({
//         error: 'Interest already sent to this user within the last 15 days.'
//       });
//     }

//     const interest = await Interest.create({ senderId, receiverId, type: 'interest' });

//     // ✅ Notify
//     const msg = `Hi ${receiver.name},\n\nYou received a new interest from ${sender.name} (${sender.email}).`;
//     await sendOTP(receiver.email, null, msg, 'New Interest on Bizplorers');

//     return res.status(201).json({ message: 'Interest sent successfully', interest });
//   } catch (error) {
//     console.error('Interest Error:', error);
//     return res.status(500).json({ error: 'Server error' });
//   }
// };

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
