const express = require('express');
const router = express.Router();
const requireAdmin = require('../middleware/adminMiddleware');

router.get('/dashboard', requireAdmin, (req, res) => {
  res.json({ message: `Welcome, Admin!`, user: req.user });
});

module.exports = router;
