const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
