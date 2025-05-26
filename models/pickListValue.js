const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const PicklistCategory = require('./pickListCategory');

const PicklistValue = sequelize.define('PicklistValue', {
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

PicklistValue.belongsTo(PicklistCategory, { foreignKey: 'category_id' });
PicklistCategory.hasMany(PicklistValue, { foreignKey: 'category_id' });

module.exports = PicklistValue;
