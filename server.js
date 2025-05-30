require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const buyerRoutes=require('./routes/buyerRoutes');
const sellerRoutes=require('./routes/sellerRoutes');
const pickListRoutes=require('./routes/pickListRoutes');
const brokerRoutes=require('./routes/brokerRoutes');
const createAdminIfNotExists=require('./utils/createAdmin');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors()); 
const PORT = process.env.PORT || 3000;

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});


// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully");

    // Start the server only after DB is connected
    sequelize.sync({ alter: true }).then(async() => {
       await createAdminIfNotExists();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
     });
     app.get('/',(req,res)=>{
    console.log("Hello server working fine");
    res.send("helooo..is connection successfuly")
})
  })
  .catch(err => {
    console.error("Error connecting to the database:", err);
  });
// app.get('/',(req,res)=>{
//     console.log("Hello server working fine");
//     res.send("helooo..is connection successfuly")
// })

app.use('/api/auth', authRoutes);
app.use('/api/buyer',buyerRoutes);
app.use('/api/seller',sellerRoutes);
app.use('/api/picklist',pickListRoutes);
app.use('/api/broker',brokerRoutes);

// sequelize.sync().then(() => {
//   app.listen(process.env.PORT, () => {
//     console.log(`Server running on port ${process.env.PORT}`);
//   });
//  });
