
// module.exports = (sequelize, DataTypes) => {
//   const PicklistValue = sequelize.define('PicklistValue', {
//     value: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     is_active: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   }, {
//     timestamps: true,
//   });

//   // Define associations inside this method
//   PicklistValue.associate = (models) => {
//     PicklistValue.belongsTo(models.PicklistCategory, {
//       foreignKey: 'category_id',
//       onDelete: 'CASCADE',
//     });

//     // Optional: also define reverse relation here
//     models.PicklistCategory.hasMany(PicklistValue, {
//       foreignKey: 'category_id',
//       onDelete: 'CASCADE',
//     });
//   };

//   return PicklistValue;
// };

// module.exports = (sequelize, DataTypes) => {
//   const PicklistValue = sequelize.define('PicklistValue', {
//     value: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     is_active: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//     parent_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//   }, {
//     timestamps: true,
//   });

//   PicklistValue.associate = (models) => {
//     PicklistValue.belongsTo(models.PicklistCategory, {
//       foreignKey: 'category_id',
//       onDelete: 'CASCADE',
//     });

//     models.PicklistCategory.hasMany(PicklistValue, {
//       foreignKey: 'category_id',
//       onDelete: 'CASCADE',
//     });

//     // ✅ Self-referencing association
//     PicklistValue.belongsTo(models.PicklistValue, {
//       as: 'parent',
//       foreignKey: 'parent_id',
//     });

//     PicklistValue.hasMany(models.PicklistValue, {
//       as: 'children',
//       foreignKey: 'parent_id',
//     });
//   };

//   return PicklistValue;
// };


// module.exports = (sequelize, DataTypes) => {
//   const PicklistValue = sequelize.define('PicklistValue', {
//     value: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     is_active: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//     parent_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     }
//   }, {
//     timestamps: true,
//     indexes: [
//       {
//         unique: true,
//         fields: ['value', 'category_id', 'parent_id']
//       }
//     ]
//   });

//   PicklistValue.associate = (models) => {
//     // Category relation
//     PicklistValue.belongsTo(models.PicklistCategory, {
//       foreignKey: 'category_id',
//       onDelete: 'CASCADE',
//     });

//     models.PicklistCategory.hasMany(PicklistValue, {
//       foreignKey: 'category_id',
//       onDelete: 'CASCADE',
//     });

//     // Self-referencing relation
//     PicklistValue.belongsTo(models.PicklistValue, {
//       as: 'parent',
//       foreignKey: 'parent_id',
//     });

//     PicklistValue.hasMany(models.PicklistValue, {
//       as: 'children',
//       foreignKey: 'parent_id',
//     });
//   };

//   return PicklistValue;
// };
module.exports = (sequelize, DataTypes) => {
  const PicklistValue = sequelize.define('PicklistValue', {
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category_id: { // ✅ Add this!
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['value', 'category_id', 'parent_id'] // ✅ composite unique index
      }
    ]
  });

  PicklistValue.associate = (models) => {
    // Category relation
    PicklistValue.belongsTo(models.PicklistCategory, {
      foreignKey: 'category_id',
      onDelete: 'CASCADE',
    });

    models.PicklistCategory.hasMany(PicklistValue, {
      foreignKey: 'category_id',
      onDelete: 'CASCADE',
    });

    // Self-referencing relation
    PicklistValue.belongsTo(models.PicklistValue, {
      as: 'parent',
      foreignKey: 'parent_id',
    });

    PicklistValue.hasMany(models.PicklistValue, {
      as: 'children',
      foreignKey: 'parent_id',
    });
  };

  return PicklistValue;
};

