// models/Interest.js
module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define('Interest', {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('interest', 'invite'),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  });

  // Optional: associate with User model
  Interest.associate = (models) => {
    Interest.belongsTo(models.User, { as: 'Sender', foreignKey: 'senderId' });
    Interest.belongsTo(models.User, { as: 'Receiver', foreignKey: 'receiverId' });
  };

  return Interest;
};
