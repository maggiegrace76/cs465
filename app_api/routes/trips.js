// app_api/routes/trips.js
const express = require('express');
const router = express.Router();

const tripsCtrl = require('../controllers/trips');
const { requireAuth } = require('../config/auth');

// ---------- PUBLIC ----------
/**
 * GET /api/trips
 * GET /api/trips/:tripId                      (by Mongo _id)
 * GET /api/trips/by-code/:code                (by business code)
 */
router.get('/trips', tripsCtrl.list);
router.get('/trips/:tripId', tripsCtrl.getOne);
router.get('/trips/by-code/:code', tripsCtrl.getByCode);

// ---------- ADMIN (JWT protected) ----------
/**
 * POST   /api/trips                           (create)
 * PUT    /api/trips/:tripCode                 (update by code)
 * DELETE /api/trips/:tripCode                 (delete by code)
 */
router.post('/trips', requireAuth, tripsCtrl.create);
router.put('/trips/:tripCode', requireAuth, tripsCtrl.updateByCode);
router.delete('/trips/:tripCode', requireAuth, tripsCtrl.removeByCode);

module.exports = router;
