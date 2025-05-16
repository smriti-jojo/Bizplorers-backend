const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Picklist = sequelize.define('Picklist', {
  type: DataTypes.STRING,
  value: DataTypes.STRING,
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Picklist;
