// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user');
const Buyer = require('./buyer');
const Seller=require('./seller');

// Define associations
User.hasOne(Buyer, { foreignKey: 'userId' });
Buyer.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Buyer,
  Seller
};
