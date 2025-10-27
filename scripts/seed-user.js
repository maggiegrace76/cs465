require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../app_api/models/user');

(async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';
    console.log('Connecting to MongoDB at:', uri); // debug
    await mongoose.connect(uri);

    const email = 'admin@example.com';
    const name = 'Admin User';
    const password = 'Admin123!';

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('User already exists:', email);
    } else {
      const u = new User({ name, email, role: 'admin' });
      await u.setPassword(password);
      await u.save();
      console.log('Created user:', email, 'password:', password);
    }
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
