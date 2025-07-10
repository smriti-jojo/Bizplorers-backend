
// module.exports = (sequelize, DataTypes) => {
//   const PicklistCategory = sequelize.define('PicklistCategory', {
//     name: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false,
//     },
//   }, {
//     timestamps: true,
//   });

//   return PicklistCategory;
// };

module.exports = (sequelize, DataTypes) => {
  const PicklistCategory = sequelize.define('PicklistCategory', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  return PicklistCategory;
};
