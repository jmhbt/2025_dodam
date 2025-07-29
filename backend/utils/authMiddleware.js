// utils/authMiddleware.js
const jwtUtils = require('./jwtUtils');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ message: '로그인이 필요합니다.' });
  try {
    const payload = jwtUtils.verifyAccessToken(auth);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Access Token이 유효하지 않습니다.' });
  }
};
