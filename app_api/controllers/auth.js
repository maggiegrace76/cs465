const User = require('../models/user');
const { signToken } = require('../config/auth');

async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken({ _id: user._id.toString(), email: user.email, role: user.role });
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { login };
