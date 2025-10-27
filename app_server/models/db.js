const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const dbURI = 'mongodb://127.0.0.1:27017/travlr';

// connect immediately and log what happens
(async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('Mongoose connected to', dbURI);
  } catch (err) {
    console.error('Mongoose connection error:', err.message);
  }
})();

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// register the model
require('./travlr');

module.exports = mongoose;

