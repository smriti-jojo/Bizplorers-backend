

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const User = sequelize.define('User', {
//   email: { type: DataTypes.STRING, unique: true },
//   password: DataTypes.STRING,
//   role: { type: DataTypes.ENUM('buyer', 'seller', 'broker','admin'), allowNull: false },
//   name: DataTypes.STRING,
//   phone: DataTypes.BIGINT,
//   otp: DataTypes.STRING,
//   isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
//   isActive: { type: DataTypes.BOOLEAN, defaultValue: true },

//   // Add comment field here:
//   comment: DataTypes.TEXT,  // allows null by default
// }, {
//   timestamps: true, // adds createdAt and updatedAt
//   paranoid: true,   // enables soft delete and adds deletedAt
// });

// User.associate = (models) => {
//   User.hasOne(models.Seller, {
//     foreignKey: 'userId',  // this is the actual field in your Seller model
//     onDelete: 'CASCADE',
//   });
// };


// module.exports = User;

// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: { type: DataTypes.ENUM('buyer', 'seller', 'broker', 'admin'), allowNull: false },
    name: DataTypes.STRING,
    phone: DataTypes.BIGINT,
    otp: DataTypes.STRING,
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    comment: DataTypes.TEXT,
  },{
    tableName: 'Users',       // ✅ Explicit table name
    modelName: 'User',        // ✅ Optional but good practice
    freezeTableName: true     // ✅ Prevent auto-pluralization
  }, {
    timestamps: true,
    paranoid: true,
  });

  User.associate = (models) => {
    User.hasOne(models.Seller, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasOne(models.Buyer, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasOne(models.Broker, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return User;
};
