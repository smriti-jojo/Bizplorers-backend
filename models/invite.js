module.exports = (sequelize, DataTypes) => {
  const Invite = sequelize.define('Invite', {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      defaultValue: 'pending'
    }
  }, {
    tableName: 'invites',
    timestamps: true
  });

  Invite.associate = (models) => {
    Invite.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' , onDelete: 'CASCADE'});
    Invite.belongsTo(models.User, { as: 'receiver', foreignKey: 'receiverId' , onDelete: 'CASCADE'});
  };

  return Invite;
};
