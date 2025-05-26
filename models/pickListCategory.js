const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PicklistCategory = sequelize.define('PicklistCategory', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = PicklistCategory;
