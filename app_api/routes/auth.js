// app_api/routes/auth.js
const express = require('express');
const router = express.Router();

const { login } = require('../controllers/auth');

// TEMP: quick ping to prove this router is mounted
router.get('/_ping', (_req, res) => res.json({ authRouter: 'ok' }));

// POST /api/auth/login  (note: ONLY '/login' here)
router.post('/login', login);

module.exports = router;
