const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

// 1. Load all models
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const modelDef = require(path.join(__dirname, file));
    const model = modelDef(sequelize, Sequelize.DataTypes); // ✅ FIXED
     console.log("Loaded model:", model.name);  
    db[model.name] = model;
  });

// 2. Apply associations
Object.keys(db).forEach(modelName => {
  
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


// 3. Export
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
