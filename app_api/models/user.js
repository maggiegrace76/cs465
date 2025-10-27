const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    hash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'admin',
    },
  },
  { timestamps: true }
);

// Set hashed password
userSchema.methods.setPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  this.hash = await bcrypt.hash(password, salt);
};

// Validate entered password
userSchema.methods.validPassword = async function (password) {
  return bcrypt.compare(password, this.hash);
};

// Export model
module.exports = mongoose.model('User', userSchema);
