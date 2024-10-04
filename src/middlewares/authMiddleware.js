const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwtConfig');

const protect = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = protect;
