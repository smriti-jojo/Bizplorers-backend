// const  Seller = require("../models");.
const { User, Seller,Buyer,Broker } = require('../models');
console.log("Seller",Seller);
// const Buyer=require('../models/buyer');
// const  Broker=require('../models/broker');

//POST: Create seller profile
// exports.createSeller = async (req, res) => {
//   try {
//     const existing = await Seller.findOne({ where: { userId: req.user.id } });
//     if (existing) {
//       return res.status(400).json({ message: "Seller profile already exists." });
//     }
//    const payload = { ...req.body, userId: req.user.id };

//     // Optional: allow broker to create seller on behalf of someone else
//     // if (req.user.role === 'broker' && req.body.brokerId) {
//     //   payload.brokerId = req.body.brokerId;
//     // }
//         if (req.user.role === 'broker') {
//   payload.brokerId = req.user.id;
// }
//     const seller = await Seller.create(payload);
//     res.status(201).json(seller);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
exports.createSeller = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if user exists (optional but safe)
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    // Check if Seller profile already exists for this user
    const existingSeller = await Seller.findOne({ where: { userId } });
    if (existingSeller) {
      return res.status(400).json({ message: "Seller profile already exists." });
    }

    // Prepare data to insert
    const payload = {
      ...req.body,
      userId,
    };

    // If broker is creating their own profile or acting as seller
    if (req.user.role === 'broker') {
      payload.brokerId = userId;
    }

    // Save seller profile
    const newSeller = await Seller.create(payload);
    return res.status(201).json(newSeller);

  } catch (err) {
    console.error("Error in createSeller:", err);
    return res.status(500).json({ message: err.message || "Something went wrong." });
  }
};




// GET: Fetch own seller profile
exports.getSeller = async (req, res) => {
  try {
    const seller = await Seller.findOne({ where: { userId: req.user.id } });
    if (!seller) {
      return res.status(404).json({ message: "No seller details found." });
    }

    res.json(seller);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT: Update seller profile
exports.updateSeller = async (req, res) => {
  try {
    const seller = await Seller.findOne({ where: { userId: req.user.id } });
    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found." });
    }

    await seller.update(req.body);
    res.json(seller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// exports.getSellersByBrokerId = async (req, res) => {
//   const { brokerId } = req.params;

//   try {
//     const sellers = await Seller.findAll({
//       where: {
//         brokerId: brokerId
//       },
//       include: [{ model: User 
        

//       }],
     
//     });
    

//      if (sellers.length === 0) {
//       return res.status(404).json({ message: 'No sellers found for this broker.' });
//     }
//     return res.status(200).json(sellers);
//   } catch (error) {
//     console.error('Error fetching buyers:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// GET: Fetch all seller profiles (admin or general view)
// exports.getAllSellers = async (req, res) => {
//   try {
//     const sellers = await Seller.findAll();
//     if (!sellers || sellers.length === 0) {
//       return res.status(404).json({ message: "No sellers found." });
//     }
//     res.status(200).json(sellers);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
exports.getSellersByBrokerId = async (req, res) => {
  const { brokerId } = req.params;

  try {
    const sellers = await Seller.findAll({
      where: { brokerId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'phone', 'isVerified', 'isActive', 'role'],
        },
      ],
    });

    if (sellers.length === 0) {
      return res.status(404).json({ message: 'No sellers found for this broker.' });
    }

    return res.status(200).json(sellers);
  } catch (error) {
    console.error('Error fetching sellers:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'phone', 'isVerified', 'isActive', 'role'],
        },
      ],
    });

    if (!sellers || sellers.length === 0) {
      return res.status(404).json({ message: "No sellers found." });
    }

    res.status(200).json(sellers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


