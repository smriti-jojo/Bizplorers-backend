// utils/createAdmin.js
const bcrypt = require('bcrypt');
const {User}=require('../models')

async function createAdminIfNotExists() {
  const existingAdmin = await User.findOne({ where: { email: 'admin@gmail.com' } });

  if (!existingAdmin) {
    const hashed = await bcrypt.hash('admin123', 10);
    await User.create({
      email: 'admin@gmail.com',
      password: hashed,
      role: 'admin',
      isVerified: true,
      name: 'Admin User',
    });

    console.log('Admin user created.');
  } else {
    console.log('Admin user already exists.');
  }
}

module.exports = createAdminIfNotExists;
