const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Buyer = sequelize.define('Buyer', {
    userId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  unique: true,
},
  typeOfBuyer: {
    type: DataTypes.ENUM('Individual', 'Organisation'),
    allowNull: false,
    validate: { notEmpty: true }
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { notEmpty: true }
  },
  linkedinProfile: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true
    }
  },
  businessCategories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ticketSizeMin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      isInt: true
    }
  },
  ticketSizeMax: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      isInt: true
    }
  },
  businesslocationCountry: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  businesslocationCities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    validate: { notEmpty: true }
  },
  openToPreRevenue: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  openToPreBreakeven: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  revenueSizeMin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      isInt: true
    }
  },
  revenueSizeMax: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      isInt: true
    }
  },
//   transactionDetails: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//     validate: { notEmpty: true }
//   },
  metric: {
    type: DataTypes.ENUM('sales', 'profit'),
    allowNull: false,
    validate: { notEmpty: true }
  },
  maxMultiple: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  preferredArrangement: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
//   status: {
//   type: DataTypes.ENUM('active', 'dormant'),
//   allowNull: false,
//   defaultValue: 'active'
// }
status: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: 'active',
  validate: {
    isIn: [['active', 'dormant']]
  }
}


});
// Buyer.belongsTo(User, { foreignKey: 'userId' });

module.exports = Buyer;
