// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
// const PicklistCategory = require('./pickListCategory');

// const PicklistValue = sequelize.define('PicklistValue', {
//   value: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   is_active: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: true,
//   },
// }, {
//   timestamps: true,
// });

// PicklistValue.belongsTo(PicklistCategory, { foreignKey: 'category_id' });
// PicklistCategory.hasMany(PicklistValue, { foreignKey: 'category_id' });

// module.exports = PicklistValue;
// models/picklistValue.js
module.exports = (sequelize, DataTypes) => {
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

  // Define associations inside this method
  PicklistValue.associate = (models) => {
    PicklistValue.belongsTo(models.PicklistCategory, {
      foreignKey: 'category_id',
      onDelete: 'CASCADE',
    });

    // Optional: also define reverse relation here
    models.PicklistCategory.hasMany(PicklistValue, {
      foreignKey: 'category_id',
      onDelete: 'CASCADE',
    });
  };

  return PicklistValue;
};
