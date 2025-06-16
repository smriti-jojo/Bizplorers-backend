// models/broker.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


  const Broker = sequelize.define('Broker', {
      userId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  unique: true,
},
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
   
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull:false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: 'active',
  validate: {
    isIn: [['active', 'dormant']]
  }
},
dataFilled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // ✅ set default to false
    allowNull: false,
  }
  });
  
module.exports = Broker
