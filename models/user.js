

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


// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     email: { type: DataTypes.STRING, unique: true },
//     password: DataTypes.STRING,
//     role: { type: DataTypes.ENUM('buyer', 'seller', 'broker', 'admin'), allowNull: false },
//     name: DataTypes.STRING,
//     phone: DataTypes.BIGINT,
//     otp: DataTypes.STRING,
//     isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
//     isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
//     comment: DataTypes.TEXT,
//   },{
//     tableName: 'Users',       // ✅ Explicit table name
//     modelName: 'User',        // ✅ Optional but good practice
//     freezeTableName: true     // ✅ Prevent auto-pluralization
//   }, {
//     timestamps: true,
//     paranoid: true,
//   });

//   User.associate = (models) => {
//     User.hasOne(models.Seller, { foreignKey: 'userId', onDelete: 'CASCADE' });
//     User.hasOne(models.Buyer, { foreignKey: 'userId', onDelete: 'CASCADE' });
//     User.hasOne(models.Broker, { foreignKey: 'userId', onDelete: 'CASCADE' });
// //for broker association
//     User.hasMany(models.Seller, { foreignKey: 'brokerId', as: 'sellers' });
// User.hasMany(models.Buyer, { foreignKey: 'brokerId', as: 'buyers' });

//   };

//   return User;
// };

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('buyer', 'seller', 'broker', 'admin'),
      allowNull: false
    },
    name: DataTypes.STRING,
    phone: DataTypes.BIGINT,
    otp: DataTypes.STRING,
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    comment: DataTypes.TEXT,

    // ✅ New field: references the broker (user) who created/controls this user
    brokerUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users', // Refers to the same Users table
        key: 'id'
      },
      onDelete: 'SET NULL'
    }
  }, {
    tableName: 'Users',
    modelName: 'User',
    freezeTableName: true,
    timestamps: true,
    paranoid: true
  });

  User.associate = (models) => {
    // Individual profile associations
    User.hasOne(models.Seller, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasOne(models.Buyer, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasOne(models.Broker, { foreignKey: 'userId', onDelete: 'CASCADE' });

    // Optional legacy associations if using brokerId directly in Seller/Buyer tables
    User.hasMany(models.Seller, { foreignKey: 'brokerId', as: 'sellers' });
    User.hasMany(models.Buyer, { foreignKey: 'brokerId', as: 'buyers' });

    // ✅ Broker <-> Managed Users (via brokerUserId in User table)
    User.belongsTo(models.User, {
      as: 'broker', // for User.getBroker()
      foreignKey: 'brokerUserId'
    });

    User.hasMany(models.User, {
      as: 'managedUsers', // for BrokerUser.getManagedUsers()
      foreignKey: 'brokerUserId'
    });
User.hasMany(models.Interest, { as: 'sentInterests', foreignKey: 'senderId',onDelete: 'CASCADE', hooks: true});
User.hasMany(models.Interest, { as: 'receivedInterests', foreignKey: 'receiverId' ,onDelete: 'CASCADE',hooks: true});

User.hasMany(models.Invite, { as: 'sentInvites', foreignKey: 'senderId',onDelete: 'CASCADE', hooks: true});
User.hasMany(models.Invite, { as: 'receivedInvites', foreignKey: 'receiverId',onDelete: 'CASCADE',hooks: true });

  };

  

  return User;
};


