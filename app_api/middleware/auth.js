const jwt = require('jsonwebtoken');

exports.requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.requireAdmin = (req, _res, next) => {
  if (req.user?.role !== 'admin') return _res.status(403).json({ message: 'Forbidden' });
  next();
};
