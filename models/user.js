// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const User = sequelize.define('User', {
//   email: { type: DataTypes.STRING, unique: true },
//   password: DataTypes.STRING,
//   role: { type: DataTypes.ENUM('buyer', 'seller', 'broker','admin'), allowNull: false },
//   name: DataTypes.STRING,
//   phone:DataTypes.BIGINT,
//   otp: DataTypes.STRING,
//   isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
//   isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
// });

// module.exports = User;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  role: { type: DataTypes.ENUM('buyer', 'seller', 'broker','admin'), allowNull: false },
  name: DataTypes.STRING,
  phone: DataTypes.BIGINT,
  otp: DataTypes.STRING,
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  timestamps: true, // adds createdAt and updatedAt
  paranoid: true,   // enables soft delete and adds deletedAt
});
module.exports = User;