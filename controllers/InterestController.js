// const { Interest, User } = require('../models');

// exports.sendInterest = async (req, res) => {
//   const { senderId, receiverId, type } = req.body;

//   if (!['interest', 'invite'].includes(type)) {
//     return res.status(400).json({ error: 'Invalid type' });
//   }

//   try {
//     const interest = await Interest.create({ senderId, receiverId, type });
//     return res.status(201).json({ message: `${type} sent successfully`, interest });
//   } catch (error) {
//     console.error('Error sending interest:', error);
//     return res.status(500).json({ error: 'Server error' });
//   }
// };

const { Interest, User } = require('../models');
const sendOTP = require('../utils/sendOTP'); // you're reusing this to send custom mail

exports.sendInterest = async (req, res) => {
  const { senderId, receiverId, type } = req.body;

  if (!['interest', 'invite'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  try {
    const sender = await User.findByPk(senderId);
    const receiver = await User.findByPk(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }

    const interest = await Interest.create({ senderId, receiverId, type });

    // ✅ Send email to receiver using sendOTP for notification
    const customMessage = `Hi ${receiver.name},\n\nYou have received a new ${type} from ${sender.name} (${sender.email}).\nPlease log in to Bizplorers to take action.`;

    await sendOTP(receiver.email, null, customMessage); // ✅ no OTP, just use custom message

    return res.status(201).json({ message: `${type} sent successfully`, interest });
  } catch (error) {
    console.error('Error sending interest:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
