// models/Seller.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


  const Seller = sequelize.define("Seller", {
      userId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  unique: true,
},
    company_name: { type: DataTypes.STRING, allowNull: false },
    website_url: { type: DataTypes.STRING, allowNull: false },
    CIN: { type: DataTypes.STRING, allowNull: false },
    company_linkedin: { type: DataTypes.STRING, allowNull: false },
    description_business: { type: DataTypes.TEXT, allowNull: false },
    numcofounder: { type: DataTypes.INTEGER, allowNull: false },
    teamSize: { type: DataTypes.INTEGER, allowNull: false },
    numLocation: { type: DataTypes.INTEGER, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    month: { type: DataTypes.INTEGER, allowNull: false },
    cofounder_linkedin: { type: DataTypes.STRING, allowNull: false },
    businessCategory: { type: DataTypes.STRING, allowNull: false },
    // businessLocation: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    entityStructure: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    // status: { type: DataTypes.STRING, allowNull: false },
    lastFinancialYear: { type: DataTypes.STRING, allowNull: false },
    prevFinancialYear: { type: DataTypes.STRING, allowNull: false },
    prePrevFinancialYear: { type: DataTypes.STRING, allowNull: false },
    trail12months: { type: DataTypes.STRING, allowNull: false },
    lastmonth: { type: DataTypes.STRING, allowNull: false },
    prevMonth: { type: DataTypes.STRING, allowNull: false },
    prePrevMonth: { type: DataTypes.STRING, allowNull: false },
    PATlastFinancialYear: { type: DataTypes.STRING, allowNull: false },
    PATprevFinancialYear: { type: DataTypes.STRING, allowNull: false },
    PATtrailing12months: { type: DataTypes.STRING, allowNull: false },
    PATlastmonth: { type: DataTypes.STRING, allowNull: false },
    PATprevMonth: { type: DataTypes.STRING, allowNull: false },
    PATprePrevMonth: { type: DataTypes.STRING, allowNull: false },
    EBITDA: { type: DataTypes.STRING, allowNull: false },
    OCFlastFinancialYear: { type: DataTypes.STRING, allowNull: false },
    assestDesc: { type: DataTypes.STRING, allowNull: false },
    equity: { type: DataTypes.STRING, allowNull: false },
    debt: { type: DataTypes.STRING, allowNull: false },
    OCFprevFinancialYear: { type: DataTypes.STRING, allowNull: false },
    OCFprePrevFinancialYear: { type: DataTypes.STRING, allowNull: false },
    salereason: { type: DataTypes.STRING, allowNull: false },
    askingPrice: { type: DataTypes.STRING, allowNull: false },
    preferredArrangement: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
     status: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: 'active',
  validate: {
    isIn: [['active', 'dormant']]
  }
},
brokerId: {
  type: DataTypes.INTEGER,
  allowNull: true
}

  });

  
module.exports = Seller
