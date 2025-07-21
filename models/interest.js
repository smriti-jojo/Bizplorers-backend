// module.exports = (sequelize, DataTypes) => {
//   const Interest = sequelize.define('Interest', {
//     senderId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     receiverId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     }
//   }, {
//     tableName: 'interests',
//     timestamps: true
//   });

//   Interest.associate = (models) => {
//     Interest.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' });
//     Interest.belongsTo(models.User, { as: 'receiver', foreignKey: 'receiverId' });
//   };

//   return Interest;
// };
module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define('Interest', {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'interests',
    timestamps: true
  });

  Interest.associate = (models) => {
    Interest.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' , onDelete: 'CASCADE',hooks: true});
    Interest.belongsTo(models.User, { as: 'receiver', foreignKey: 'receiverId', onDelete: 'CASCADE',hooks: true });
  };

  return Interest;
};
