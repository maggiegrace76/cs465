const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Trip = require('./travlr');

const dbURI = 'mongodb://127.0.0.1:27017/travlr';

(async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('Connected to MongoDB:', dbURI);

    const filePath = path.join(__dirname, '..', '..', 'data', 'trips.json');
    console.log('Reading data from:', filePath);

    const data = fs.readFileSync(filePath, 'utf8');
    const trips = JSON.parse(data);
    console.log('Trips loaded:', trips.length);

    const del = await Trip.deleteMany({});
    console.log('Deleted existing trips:', del.deletedCount);

    const ins = await Trip.insertMany(trips);
    console.log('Inserted new trips:', ins.length);

    const count = await Trip.countDocuments();
    console.log('Final trip count:', count);
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Mongoose disconnected.');
    process.exit(0);
  }
})();

