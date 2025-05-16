require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully");

    // Start the server only after DB is connected
    sequelize.sync().then(() => {
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

// sequelize.sync().then(() => {
//   app.listen(process.env.PORT, () => {
//     console.log(`Server running on port ${process.env.PORT}`);
//   });
//  });
