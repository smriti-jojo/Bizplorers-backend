require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db = require('./models'); // Loads all models (User, Buyer, Seller, etc.)
const createAdminIfNotExists = require('./utils/createAdmin');

// Route imports
const authRoutes = require('./routes/authRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const pickListRoutes = require('./routes/pickListRoutes');
const brokerRoutes = require('./routes/brokerRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send("✅ Hello, server is running!");
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/picklist', pickListRoutes);
app.use('/api/broker', brokerRoutes);
app.use('/api/users', userRoutes);

// Optional: Health check route for deployment
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start the server after DB connection and sync
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Database connected successfully");
//  await db.sequelize.sync({ force: false }); //for prod
    //  await db.sequelize.sync({ alter: true }); // Use force: true only in dev with caution
    // await db.sequelize.sync({ force: true });
    await db.sequelize.sync(); // or db.sequelize.sync({ alter: true }) if you're still evolving schema


    console.log("✅ All models synced successfully");

    await createAdminIfNotExists();
    console.log("✅ Admin checked/created");

    app.listen(PORT, () => {
      console.log(`🚀 Server is live at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to initialize server:", err);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
});
