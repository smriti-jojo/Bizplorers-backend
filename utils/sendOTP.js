// const nodemailer = require('nodemailer');

// module.exports = async function sendOTP(email, otp) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   await transporter.sendMail({
//     from: `"System" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Your OTP Code",
//     text: `Use this OTP to verify your email: ${otp}`
//   });
// };
// const nodemailer = require('nodemailer');

// module.exports = async function sendOTP(email, otp) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });
// console.log("user",process.env.EMAIL_USER);
// console.log("pass",process.env.EMAIL_PASS);
//   try {
//     await transporter.sendMail({
//       from: `"Bizplorers" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP Code",
//       text: `Use this OTP to verify your email: ${otp}`
//     });
//     console.log(`OTP sent to ${email}`);
//   } catch (err) {
//     console.error('Error sending OTP email:', err);
//     throw err;  // propagate error so caller knows
//   }
// };
const nodemailer = require('nodemailer');

module.exports = async function sendOTP(email, otp, customMessage,customSubject) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const text = customMessage || `Use this OTP to verify your email: ${otp}`;
  const subject=customSubject || "Your OTP Code";

  try {
    await transporter.sendMail({
      from: `"Bizplorers" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: text,
    });
    console.log(`OTP sent to ${email}`);
  } catch (err) {
    console.error('Error sending OTP email:', err);
    throw err;
  }
};
