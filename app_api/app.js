const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { connect } = require('./config/db');

const api = express();
api.use(morgan('dev'));
api.use(cors());
api.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';
connect(MONGODB_URI);

api.use('/trips', require('./routes/trips'));

api.use((req, res) => res.status(404).json({ message: 'Not Found' }));
api.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid ID format' });
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});
module.exports = api;
