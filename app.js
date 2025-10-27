// app.js (root of ~/Documents/cs465)
const express = require('express');
const path = require('path');

// ---- connect to Mongo ----
const { connect } = require('./app_api/config/db');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';
connect(MONGODB_URI);

const app = express();
app.use(express.json());

// ---- simple root route so "/" works ----
app.get('/', (_req, res) => {
  res.send('Travlr API is running. Try <a href="/api/trips">/api/trips</a>.');
});

// ---- mount the API under /api ----
const tripsRouter = require('./app_api/routes/trips');
app.use('/api', tripsRouter);

// ---- (optional) serve static/public assets if you have any ----
app.use(express.static(path.join(__dirname, 'public')));

// ---- start server ----
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
