// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const Buyer = sequelize.define('Buyer', {
//     userId: {
//   type: DataTypes.INTEGER,
//   allowNull: false,
//   unique: true,
// },
//   typeOfBuyer: {
//     type: DataTypes.ENUM('Individual', 'Organisation'),
//     allowNull: false,
//     validate: { notEmpty: true }
//   },
//   designation: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: { notEmpty: true }
//   },
//   description: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//     validate: { notEmpty: true }
//   },
//   linkedinProfile: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     validate: {
//       isUrl: true,
//       notEmpty: true
//     }
//   },
//   businessCategories: {
//     type: DataTypes.ARRAY(DataTypes.STRING),
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   },
//   ticketSizeMin: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     validate: {
//       min: 1,
//       isInt: true
//     }
//   },
//   ticketSizeMax: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     validate: {
//       min: 1,
//       isInt: true
//     }
//   },
//   businesslocationCountry: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: { notEmpty: true }
//   },
//   businesslocationCities: {
//     type: DataTypes.ARRAY(DataTypes.STRING),
//     allowNull: false,
//     validate: { notEmpty: true }
//   },
//   openToPreRevenue: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false
//   },
//   openToPreBreakeven: {
//     type: DataTypes.BOOLEAN,
//     allowNull: true
//   },
//   revenueSizeMin: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     validate: {
//       min: 0,
//       isInt: true
//     }
//   },
//   revenueSizeMax: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     validate: {
//       min: 0,
//       isInt: true
//     }
//   },
// //   transactionDetails: {
// //     type: DataTypes.TEXT,
// //     allowNull: false,
// //     validate: { notEmpty: true }
// //   },
//   metric: {
//     type: DataTypes.ENUM('sales', 'profit'),
//     allowNull: false,
//     validate: { notEmpty: true }
//   },
//   maxMultiple: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     validate: {
//       min: 0
//     }
//   },
//   preferredArrangement: {
//     type: DataTypes.ARRAY(DataTypes.STRING),
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   },
// //   status: {
// //   type: DataTypes.ENUM('active', 'dormant'),
// //   allowNull: false,
// //   defaultValue: 'active'
// // }
// status: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   defaultValue: 'active',
//   validate: {
//     isIn: [['active', 'dormant']]
//   }
// }
// ,
// brokerId: {
//   type: DataTypes.INTEGER,
//   allowNull: true // Only added if created by broker
// },
// dataFilled: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false, // ✅ set default to false
//     allowNull: false,
//   }

// });
// // Buyer.belongsTo(User, { foreignKey: 'userId' });

// module.exports = Buyer;
// models/buyer.js
// module.exports = (sequelize, DataTypes) => {
//   const Buyer = sequelize.define('Buyer', {
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       unique: true,
//     },
//     typeOfBuyer: {
//       type: DataTypes.ENUM('Individual', 'Organisation'),
//       allowNull: false,
//       validate: { notEmpty: true },
//     },
//     designation: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: { notEmpty: true },
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       validate: { notEmpty: true },
//     },
//     linkedinProfile: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       validate: {
//         isUrl: true,
//         notEmpty: true,
//       },
//     },
//     businessCategories: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//       allowNull: false,
//       validate: { notEmpty: true },
//     },
//     ticketSizeMin: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         min: 1,
//         isInt: true,
//       },
//     },
//     ticketSizeMax: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         min: 1,
//         isInt: true,
//       },
//     },
//     businesslocationCountry: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: { notEmpty: true },
//     },
//     businesslocationCities: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//       allowNull: false,
//       validate: { notEmpty: true },
//     },
//     openToPreRevenue: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//     openToPreBreakeven: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//     },
//     revenueSizeMin: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       validate: {
//         min: 0,
//         isInt: true,
//       },
//     },
//     revenueSizeMax: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       validate: {
//         min: 0,
//         isInt: true,
//       },
//     },
//     metric: {
//       type: DataTypes.ENUM('sales', 'profit'),
//       allowNull: false,
//       validate: { notEmpty: true },
//     },
//     maxMultiple: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//       validate: {
//         min: 0,
//       },
//     },
//     preferredArrangement: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//       allowNull: false,
//       validate: { notEmpty: true },
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       defaultValue: 'active',
//       validate: {
//         isIn: [['active', 'dormant']],
//       },
//     },
//     brokerId: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     dataFilled: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//       allowNull: false,
//     },
//   });

  

//   Buyer.associate = (models) => {
//   Buyer.belongsTo(models.User, {
//     foreignKey: 'userId',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//   });
// };

//   return Buyer;
// };

module.exports = (sequelize, DataTypes) => {
  const Buyer = sequelize.define('Buyer',{
   userId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  unique: true,
  references: {
    model: 'Users', // or use your imported User model directly
    key: 'id'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
},

    typeOfBuyer: {
      type: DataTypes.ENUM('Individual', 'Organisation'),
      allowNull: false,
      validate: { notEmpty: true },
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    linkedinProfile: {
  type: DataTypes.STRING,
  allowNull: true, // optional field
  validate: {
    isValidUrlOrEmpty(value) {
      if (value && value.trim() !== '') {
        const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i;
        if (!urlPattern.test(value)) {
          throw new Error('Invalid LinkedIn URL');
        }
      }
    },
  },
},
    businessCategories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: { notEmpty: true },
    },
    ticketSizeMin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        isInt: true,
      },
    },
    ticketSizeMax: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        isInt: true,
      },
    },
    businesslocationCountry: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    businesslocationCities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: { notEmpty: true },
    },
    openToPreRevenue: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    openToPreBreakeven: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    // revenueSizeMin: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   validate: {
    //     min: 0,
    //     isInt: true,
    //   },
    // },
    // revenueSizeMax: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   validate: {
    //     min: 0,
    //     isInt: true,
    //   },
    // },
    metric: {
      type: DataTypes.ENUM('sales', 'profit'),
      allowNull: false,
      validate: { notEmpty: true },
    },
    maxMultiple: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    preferredArrangement: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: { notEmpty: true },
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
    
  }, {
    tableName: 'Buyers',
    modelName: 'Buyer',
    freezeTableName: true
  }, );

  // Optional: define associations if you want Sequelize to know relations
  // Buyer.associate = (models) => {
  //   Buyer.belongsTo(models.User, {
  //     foreignKey: 'userId',
  //     onDelete: 'CASCADE',
      
  //   });
  // };
  Buyer.associate = (models) => {
  Buyer.belongsTo(models.User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
};


  return Buyer;
};
