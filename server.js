require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const pickListRoutes = require('./routes/pickListRoutes');
const brokerRoutes = require('./routes/brokerRoutes');
const userRoutes = require('./routes/userRoutes');
const createAdminIfNotExists = require('./utils/createAdmin');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send("Hello, server is working fine!");
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/picklist', pickListRoutes);
app.use('/api/broker', brokerRoutes);
app.use('/api/users', userRoutes);

// Start the server immediately
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);

  // Then try connecting to the DB and syncing models
  sequelize.authenticate()
    .then(() => {
      console.log("✅ Database connected successfully");

      sequelize.sync({ alter: true }).then(async () => {
        await createAdminIfNotExists();
        console.log("✅ Models synced and admin checked/created.");
      });
    })
    .catch(err => {
      console.error("❌ Error connecting to the database:", err);
    });
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
