// utils/createAdmin.js
const bcrypt = require('bcrypt');
const User = require('../models/user');

async function createAdminIfNotExists() {
  const existingAdmin = await User.findOne({ where: { email: 'admin@example.com' } });

  if (!existingAdmin) {
    const hashed = await bcrypt.hash('YourStrongAdminPassword', 10);
    await User.create({
      email: 'admin@example.com',
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
