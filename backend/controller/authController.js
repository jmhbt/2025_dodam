const redisClient = require('../utils/redisClient');
const jwtUtils = require('../utils/jwtUtils');
const { getUser } = require('../services/userService'); // 예시

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUser(email, password);

  const accessToken = jwtUtils.generateAccessToken({ id: user.id });
  const refreshToken = jwtUtils.generateRefreshToken({ id: user.id });

  await redisClient.set(refreshToken, user.id, { EX: 7 * 24 * 3600 });

  res.json({ accessToken, refreshToken });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const decoded = jwtUtils.verifyRefreshToken(refreshToken);
    const stored = await redisClient.get(refreshToken);
    if (!stored || stored !== decoded.id.toString()) return res.sendStatus(403);

    const newAccess = jwtUtils.generateAccessToken({ id: decoded.id });
    const newRefresh = jwtUtils.generateRefreshToken({ id: decoded.id });

    await redisClient.del(refreshToken);
    await redisClient.set(newRefresh, decoded.id, { EX: 7 * 24 * 3600 });

    res.json({ accessToken: newAccess, refreshToken: newRefresh });
  } catch (err) {
    res.sendStatus(403);
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) await redisClient.del(refreshToken);
  res.sendStatus(204);
};
