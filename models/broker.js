const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const BrokerRegistration = sequelize.define('BrokerRegistration', {
  brokerId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasMany(BrokerRegistration, { foreignKey: 'brokerId' });
BrokerRegistration.belongsTo(User, { foreignKey: 'brokerId' });

module.exports = BrokerRegistration;
