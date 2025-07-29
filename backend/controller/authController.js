const redisClient = require('../utils/redisClient');
const jwtUtils = require('../utils/jwtUtils');
const { hashPassword } = require('../utils/hashUtils');
const {
  getUser,
  createUser,
  checkEmailExists,
  checkPhoneExists
} = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    if (!email || !password || !name || !phone) {
      return res.status(400).json({ message: '필수 입력값이 부족합니다.' });
    }

    if (await checkEmailExists(email)) {
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
    }

    if (await checkPhoneExists(phone)) {
      return res.status(409).json({ message: '이미 사용 중인 전화번호입니다.' });
    }

    const hashed = await hashPassword(password);
    await createUser({ email, password: hashed, name, phone });

    return res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    console.error('[Register Error]', error);
    return res.status(500).json({ message: '서버 오류' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: '이메일과 비밀번호는 필수입니다.' });
    }

    const user = await getUser(email, password);
    if (!user) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
    }

    const accessToken = jwtUtils.generateAccessToken({ id: user.id });
    const refreshToken = jwtUtils.generateRefreshToken({ id: user.id });

    await redisClient.set(refreshToken, user.id, { EX: 7 * 24 * 3600 }); // 7일

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error('[Login Error]', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh Token이 필요합니다.' });
    }

    const decoded = jwtUtils.verifyRefreshToken(refreshToken);
    const stored = await redisClient.get(refreshToken);

    if (!stored || stored !== decoded.id.toString()) {
      return res.status(403).json({ message: '유효하지 않은 Refresh Token입니다.' });
    }

    const newAccess = jwtUtils.generateAccessToken({ id: decoded.id });
    const newRefresh = jwtUtils.generateRefreshToken({ id: decoded.id });

    await redisClient.del(refreshToken);
    await redisClient.set(newRefresh, decoded.id, { EX: 7 * 24 * 3600 });

    return res.status(200).json({ accessToken: newAccess, refreshToken: newRefresh });
  } catch (error) {
    console.error('[Refresh Token Error]', error);
    return res.status(403).json({ message: 'Refresh Token 검증에 실패했습니다.' });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh Token이 필요합니다.' });
    }

    await redisClient.del(refreshToken);

    return res.sendStatus(204);
  } catch (error) {
    console.error('[Logout Error]', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
