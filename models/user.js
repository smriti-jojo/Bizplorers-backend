const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  role: { type: DataTypes.ENUM('buyer', 'seller', 'broker'), allowNull: false },
  name: DataTypes.STRING,
  phone:DataTypes.BIGINT,
  otp: DataTypes.STRING,
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = User;
