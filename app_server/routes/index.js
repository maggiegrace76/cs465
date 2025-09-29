const express = require('express');

// CRITICAL FIX: The Express Router MUST be initialized here
const router = express.Router(); 

const ctrlTravlr = require('../controllers/travlr');

/* Map the root URL ('/') to the homelist function */
router.get('/', ctrlTravlr.homelist);

module.exports = router;