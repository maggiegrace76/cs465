const mongoose = require('mongoose');
function connect(uri) {
  mongoose.set('strictQuery', true);
  mongoose.connect(uri, { autoIndex: true });
  mongoose.connection.on('connected', () => console.log('MongoDB connected:', uri));
  mongoose.connection.on('error', err => console.error('MongoDB error:', err.message));
  mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));
  process.on('SIGINT', async () => { await mongoose.connection.close(); process.exit(0); });
}
module.exports = { connect, mongoose };
