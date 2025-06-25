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
// const User = require('../models/user');
const sendOTP = require('../utils/sendOTP');
// const Broker=require('../models/broker');
// const Seller=require('../models/seller');
// const Buyer=require('../models/buyer');
const { User, Seller,Buyer,Broker } = require('../models');

// exports.register = async (req, res) => {
//   const { email, password, role, name, phone } = req.body;

//   try {
//     // ✅ Correct Sequelize syntax
//     const existingUser = await User.findOne({ where: { email } });

//     if (existingUser) {
//       if (!existingUser.isVerified) {
//         // If unverified user exists, resend OTP
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         await existingUser.update({ otp });
//         sendOTP(email, otp).catch(console.error); // Don't block response
//         return res.json({ message: 'OTP resent to existing unverified user.' });
//       }

//       return res.status(400).json({ error: 'User already exists' });
//     }

//     const hashed = await bcrypt.hash(password, 10);
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     const user = await User.create({
//       email,
//       password: hashed,
//       role,
//       name,
//       phone,
//       otp,
//       isVerified: false,
//     });

//     sendOTP(email, otp).catch(console.error); // Async, avoid waiting

//     return res.json({ message: 'OTP sent to email for verification.' });
//   } catch (err) {
//     console.error('Registration error:', err);

//     if (err.name === 'SequelizeUniqueConstraintError') {
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     return res.status(500).json({ error: 'Registration failed due to server error.' });
//   }
// };

// exports.verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });

//     if (!user || user.otp !== otp) {
//       return res.status(400).json({ error: 'Invalid OTP' });
//     }

//     user.isVerified = true;
//     user.otp = null;
//     await user.save();

//      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     return res.json({ message: 'Email verified successfully',token,user:{email:email,role:user.role,id:user.id} });
//   } catch (err) {
//     console.error('OTP Verification error:', err);
//     return res.status(500).json({ error: 'Verification failed due to server error.' });
//   }
// };

exports.register = async (req, res) => {
  const {
    email,
    password,
    role,
    name,
    phone,
    country,
    passportNumber
  } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      if (!existingUser.isVerified) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await existingUser.update({ otp });
        sendOTP(email, otp).catch(console.error);
        return res.json({ message: 'OTP resent to existing unverified user.' });
      }

      return res.status(400).json({ error: 'User already exists' });
    }

    // ✅ Validation for NRE
    if (role === 'nre') {
      if (!country || !passportNumber) {
        return res.status(400).json({
          error: 'Country and Passport Number are required for NRE registration.'
        });
      }
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
      country: role === 'nre' ? country : null,
      passportNumber: role === 'nre' ? passportNumber : null
    });

    sendOTP(email, otp).catch(console.error);

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

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const allowBypass = process.env.ALLOW_OTP_BYPASS === 'true';

    if (!allowBypass && user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Update verification status and clear OTP
    user.isVerified = true;
    user.otp = null;
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      message: allowBypass ? 'OTP bypassed for testing' : 'Email verified successfully',
      token,
      user: {
        email: user.email,
        role: user.role,
        id: user.id
      }
    });
  } catch (err) {
    console.error('OTP Verification error:', err);
    return res.status(500).json({ error: 'Verification failed due to server error.' });
  }
};
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });

//     if (!user || !user.isVerified) {
//       return res.status(403).json({ error: 'User not verified or does not exist' });
//     }

//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     return res.json({ token ,user:{email:email,role:user.role,id:user.id}});
//   } catch (err) {
//     console.error('Login error:', err);
//     return res.status(500).json({ error: 'Login failed due to server error.' });
//   }
// };
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !user.isVerified) {
      return res.status(403).json({ error: 'User not verified or does not exist' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    let roleData;
    if (user.role === "buyer") {
      roleData = await Buyer.findOne({ where: { userId: user.id } });
    } else if (user.role === "seller") {
      roleData = await Seller.findOne({ where: { userId: user.id } });
    } else if (user.role === "broker") {
      roleData = await Broker.findOne({ where: { userId: user.id } });
    }

     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      token,
      user:{email:email,role:user.role,id:user.id,name:user.name,dataFilled: roleData?.dataFilled || false}

    });

  } catch (error) {
    console.error("Login error:", error); // helpful for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
};

// exports.resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   try {
//     // 1. Find user
//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     // 2. Check OTP
//     const allowBypass = process.env.ALLOW_OTP_BYPASS === 'true';
//     if (!allowBypass && user.otp !== otp) {
//       return res.status(400).json({ error: 'Invalid or expired OTP' });
//     }

//     // 3. Hash password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // 4. Update password and clear OTP
//     user.password = hashedPassword;
//     user.otp = null;
//     await user.save();

//     return res.status(200).json({ message: 'Password reset successful' });
//   } catch (err) {
//     console.error('Reset Password error:', err);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

exports.sendResetOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.isVerified) {
      return res.status(404).json({ error: 'No verified user found with this email' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await user.update({ otp });

    await sendOTP(email, otp, `Use this OTP to reset your Bizplorers password: ${otp}`);

    // await sendOTP(email, otp); // Your existing util
    // await sendOTP(email, otp, `Use this OTP to reset your Bizplorers password: ${otp}`);


    return res.json({ message: 'OTP sent to email for password reset' });
  } catch (err) {
    console.error('Send reset OTP error:', err);
    return res.status(500).json({ error: 'Error sending OTP' });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP or user' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.otp = null;
    await user.save();

    return res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset Password error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

