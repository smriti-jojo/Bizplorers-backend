// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const Picklist = sequelize.define('Picklist', {
//   type: DataTypes.STRING,
//   value: DataTypes.STRING,
//   isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
// });

// module.exports = Picklist;
// models/picklist.js
module.exports = (sequelize, DataTypes) => {
  const Picklist = sequelize.define('Picklist', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return Picklist;
};
