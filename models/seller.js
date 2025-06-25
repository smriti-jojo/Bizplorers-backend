// // models/Seller.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');


//   const Seller = sequelize.define("Seller", {
//       userId: {
//   type: DataTypes.INTEGER,
//   allowNull: false,
//   unique: true,
// },
//     company_name: { type: DataTypes.STRING, allowNull: false },
//     website_url: { type: DataTypes.STRING, allowNull: false },
//     CIN: { type: DataTypes.STRING, allowNull: true},
//     company_linkedin: { type: DataTypes.STRING, allowNull: false },
//     description_business: { type: DataTypes.TEXT, allowNull: false },
//     numcofounder: { type: DataTypes.INTEGER, allowNull: false },
//     teamSize: { type: DataTypes.INTEGER, allowNull: false },
//     numLocation: { type: DataTypes.INTEGER, allowNull: false },
//     year: { type: DataTypes.INTEGER, allowNull: false },
//     month: { type: DataTypes.INTEGER, allowNull: false },
//     cofounderLinks: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false , defaultValue: []  } , //Empty array for existing and new rows
//     //  preferredArrangement: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
//     businessCategory: { type: DataTypes.STRING, allowNull: false },
//     // businessLocation: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
//     entityStructure: { type: DataTypes.STRING, allowNull: false },
//     country: { type: DataTypes.STRING, allowNull: false },
//     state: { type: DataTypes.STRING, allowNull: false },
//     city: { type: DataTypes.STRING, allowNull: false },
//     // status: { type: DataTypes.STRING, allowNull: false },
//     lastFinancialYear: { type: DataTypes.STRING, allowNull: false },
//     prevFinancialYear: { type: DataTypes.STRING, allowNull: false },
//     prePrevFinancialYear: { type: DataTypes.STRING, allowNull: false },
//     trail12months: { type: DataTypes.STRING, allowNull: false },
//     lastmonth: { type: DataTypes.STRING, allowNull: false },
//     prevMonth: { type: DataTypes.STRING, allowNull: false },
//     prePrevMonth: { type: DataTypes.STRING, allowNull: false },
//     PATlastFinancialYear: { type: DataTypes.STRING, allowNull: false },
//     PATprevFinancialYear: { type: DataTypes.STRING, allowNull: false },
//     PATtrailing12months: { type: DataTypes.STRING, allowNull: false },
//     PATlastmonth: { type: DataTypes.STRING, allowNull: false },
//     PATprevMonth: { type: DataTypes.STRING, allowNull: false },
//     PATprePrevMonth: { type: DataTypes.STRING, allowNull: false },
//     EBITDA: { type: DataTypes.STRING, allowNull: false },
//     OCFlastFinancialYear: { type: DataTypes.STRING, allowNull: false },
//     assestDesc: { type: DataTypes.STRING, allowNull: false },
//     equity: { type: DataTypes.STRING, allowNull: false },
//     debt: { type: DataTypes.STRING, allowNull: false },
//     OCFprevFinancialYear: { type: DataTypes.STRING, allowNull: false },
//     OCFprePrevFinancialYear: { type: DataTypes.STRING, allowNull: false },
//     salereason: { type: DataTypes.STRING, allowNull: false },
//     askingPrice: { type: DataTypes.STRING, allowNull: false },
//     preferredArrangement: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
//      status: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   defaultValue: 'active',
//   validate: {
//     isIn: [['active', 'dormant']]
//   }
// },
// brokerId: {
//   type: DataTypes.INTEGER,
//   allowNull: true
// },
// dataFilled: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false, // ✅ set default to false
//     allowNull: false,
//   }

//   });

//   Seller.associate = (models) => {
//   Seller.belongsTo(models.User, {
//     foreignKey: 'userId',
//     onDelete: 'CASCADE',
//   });
// };
  
// module.exports = Seller
// models/seller.js
module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define('Seller', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    company_name: { type: DataTypes.STRING, allowNull: false },
    website_url: { type: DataTypes.STRING, allowNull: false },
    CIN: { type: DataTypes.STRING, allowNull: true },
    company_linkedin: { type: DataTypes.STRING, allowNull: false },
    description_business: { type: DataTypes.TEXT, allowNull: false },
    numcofounder: { type: DataTypes.INTEGER, allowNull: false },
    teamSize: { type: DataTypes.INTEGER, allowNull: false },
    numLocation: { type: DataTypes.INTEGER, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    month: { type: DataTypes.INTEGER, allowNull: false },
    cofounderLinks: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    businessCategory: { type: DataTypes.STRING, allowNull: false },
    entityStructure: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },

    lastFinancialYear: { type: DataTypes.STRING, allowNull: false },
    // prevFinancialYear: { type: DataTypes.STRING, allowNull: false },
    // prePrevFinancialYear: { type: DataTypes.STRING, allowNull: false },
    trailing12months: { type: DataTypes.STRING, allowNull: false },
    // lastmonth: { type: DataTypes.STRING, allowNull: false },
    prevMonth: { type: DataTypes.STRING, allowNull: false },
    // prePrevMonth: { type: DataTypes.STRING, allowNull: false },

    NETlastFinancialYear: { type: DataTypes.STRING, allowNull: false },
    // PATprevFinancialYear: { type: DataTypes.STRING, allowNull: false },
    NETtrailing12months: { type: DataTypes.STRING, allowNull: false },
    // NETlastmonth: { type: DataTypes.STRING, allowNull: false },
    NETprevMonth: { type: DataTypes.STRING, allowNull: false },
    // PATprePrevMonth: { type: DataTypes.STRING, allowNull: false },

    // EBITDA: { type: DataTypes.STRING, allowNull: false },
    // OCFlastFinancialYear: { type: DataTypes.STRING, allowNull: false },
    assestDesc: { type: DataTypes.STRING, allowNull: false },
    equity: { type: DataTypes.STRING, allowNull: false },
    debt: { type: DataTypes.STRING, allowNull: false },
    positiveCashFlow:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // OCFprevFinancialYear: { type: DataTypes.STRING, allowNull: false },
    // OCFprePrevFinancialYear: { type: DataTypes.STRING, allowNull: false },

    salereason: { type: DataTypes.STRING, allowNull: false },
    askingPrice: { type: DataTypes.STRING, allowNull: false },
    preferredArrangement: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
      validate: {
        isIn: [['active', 'dormant']],
      },
    },

    brokerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    dataFilled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  Seller.associate = (models) => {
    Seller.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Seller.belongsTo(models.User, {
    foreignKey: 'brokerId',
    as: 'broker',
  });
  };
  


  return Seller;
};

