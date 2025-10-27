const express = require('express');
const router = express.Router(); // FIX: Router must be initialized!
const ctrlTravlr = require('../controllers/travlr');

/* Map the URL routes to controller functions */
router.get('/', ctrlTravlr.homelist);
router.get('/travel', ctrlTravlr.travelList);
router.get('/rooms', ctrlTravlr.roomList);

module.exports = router;