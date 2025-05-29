// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const sendOTP = require('../utils/sendOTP');



// exports.register = async (req, res) => {
//   const { email, password, role, name, phone } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ error: 'User already exists' });

//     const hashed = await bcrypt.hash(password, 10);
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     // const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

//     const user = await User.create({
//       email,
//       password: hashed,
//       role,
//       name,
//       phone,
//       otp,
//       // otpExpiry,
//       isVerified: false,
//     });

//     await sendOTP(email, otp);
//     res.json({ message: 'OTP sent to email for verification.' });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: 'Registration failed.' });
//   }
// };


// exports.verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;
//   const user = await User.findOne({ where: { email } });
//   if (!user || user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });

//   user.isVerified = true;
//   user.otp = null;
//   await user.save();

//   res.json({ message: 'Email verified successfully' });
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ where: { email } });

//   if (!user || !user.isVerified) return res.status(403).json({ error: 'User not verified' });

//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

//   const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
//   res.json({ token });
// };
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sendOTP = require('../utils/sendOTP');

exports.register = async (req, res) => {
  const { email, password, role, name, phone } = req.body;

  try {
    // ✅ Correct Sequelize syntax
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      if (!existingUser.isVerified) {
        // If unverified user exists, resend OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await existingUser.update({ otp });
        sendOTP(email, otp).catch(console.error); // Don't block response
        return res.json({ message: 'OTP resent to existing unverified user.' });
      }

      return res.status(400).json({ error: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      email,
      password: hashed,
      role,
      name,
      phone,
      otp,
      isVerified: false,
    });

    sendOTP(email, otp).catch(console.error); // Async, avoid waiting

    return res.json({ message: 'OTP sent to email for verification.' });
  } catch (err) {
    console.error('Registration error:', err);

    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'User already exists' });
    }

    return res.status(500).json({ error: 'Registration failed due to server error.' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ message: 'Email verified successfully',token });
  } catch (err) {
    console.error('OTP Verification error:', err);
    return res.status(500).json({ error: 'Verification failed due to server error.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !user.isVerified) {
      return res.status(403).json({ error: 'User not verified or does not exist' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token ,user:{email:email,role:user.role}});
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Login failed due to server error.' });
  }
};
