const express = require('express');
const router = express.Router();
const Trip = require('../models/travlr');

router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find({}).lean();
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

module.exports = router;

