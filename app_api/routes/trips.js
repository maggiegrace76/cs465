const express = require('express');
const router = express.Router();
const trips = require('../controllers/trips');

// collection
router.get('/trips', trips.list);
router.post('/trips', trips.create);

// item by business code
router.get('/trips/:tripCode', trips.getByCode);
router.put('/trips/:tripCode', trips.updateByCode);
router.delete('/trips/:tripCode', trips.removeByCode);

// optional legacy route
router.get('/trips/by-code/:code', trips.getByCode);

module.exports = router;
