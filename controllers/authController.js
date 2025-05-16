const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sendOTP = require('../utils/sendOTP');

exports.register = async (req, res) => {
  const { email, password, role, name,phone } = req.body;
  console.log("email-------",email);
  try {
    const hashed = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({ email, password: hashed, role, name, otp,phone });
    await sendOTP(email, otp);

    res.json({ message: 'OTP sent to email for verification.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });

  user.isVerified = true;
  user.otp = null;
  await user.save();

  res.json({ message: 'Email verified successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !user.isVerified) return res.status(403).json({ error: 'User not verified' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};
