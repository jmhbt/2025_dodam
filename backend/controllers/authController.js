const { redis, connectRedis } = require('../utils/redisClient');
const jwtUtils = require('../utils/jwtUtils');
const { hashPassword } = require('../utils/hashUtils');
const { isEmail } = require('../utils/validationUtils'); // 이메일 포맷 검사 유틸
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const {
  getUser,
  createUser,
  checkEmailExists,
  checkPhoneExists,
  findSocialIdentity,
  createSocialIdentity,
  getUserByEmail,
  createSnsUser
} = require('../services/userService');
const db = require('../utils/db');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

connectRedis();

exports.register = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    if (!email || !password || !name || !phone) {
      return res.status(400).json({ message: '필수 입력값이 부족합니다.' });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ message: '유효한 이메일 형식이 아닙니다.' });
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

exports.SendEmailVerify = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: '이메일은 필수입니다.' });
    }

    // 이메일 형식 검사
    if (!isEmail(email)) {
      return res.status(400).json({ message: '유효한 이메일 형식이 아닙니다.' });
    }

    // 이미 가입된 이메일은 사용할 수 없음
    if (await checkEmailExists(email)) {
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
    }

    // 6자리 인증 코드 생성 (000000~999999)
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Redis에 키(email:verify:<email>)로 저장, 만료시간 5분
    const redisKey = `email:verify:${email}`;
    await redis.set(redisKey, code, { EX: 5 * 60 });

    // 이메일 전송 (비동기)
    // controllers/authController.js 중 sendEmail 호출 부분
    await sendEmail({
      to: email,
      subject: '🆔 이메일 인증 코드',
      html: `
      <table cellpadding="0" cellspacing="0" width="100%" style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
        <tr>
          <td align="center">
            <table width="600" style="background:#ffffff;padding:40px;border-radius:8px;">
              <!-- 헤더 -->
              <tr>
                <td align="center" style="font-size:24px;font-weight:bold;color:#333333;">
                  이메일 인증 코드
                </td>
              </tr>
              <!-- 본문 -->
              <tr>
                <td style="padding:20px;font-size:16px;color:#555555;line-height:1.5;">
                  안녕하세요,<br/>
                  아래 <strong>인증 코드</strong>를 입력하여 이메일 인증을 완료해주세요.<br/><br/>
                  <div style="position:relative;
                              background:#f0f0f0;padding:20px;margin:20px 0;text-align:center;
                              font-size:32px;letter-spacing:4px;font-weight:bold;
                              color:#000000;border-radius:4px;">
                    <span id="verify-code" style="user-select:text;">${code}</span>
                    <button onclick="copyCode()" style="
                      position:absolute; top:8px; right:8px;
                      background:#007bff;color:#fff;border:none;
                      padding:6px 10px;font-size:12px;
                      border-radius:4px; cursor:pointer;
                    ">
                      복사
                    </button>
                  </div>
                  이 코드는 <strong>5분</strong> 동안 유효합니다.
                </td>
              </tr>
              <!-- 푸터 -->
              <tr>
                <td style="padding-top:30px;font-size:12px;color:#999999;" align="center">
                  이 메일은 발신전용입니다. 문의사항이 있으시면<br/>
                  <a href="mailto:support@your-domain.com" style="color:#007bff;text-decoration:none;">
                    support@your-domain.com
                  </a>으로 연락주세요.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <script>
        function copyCode() {
          var code = document.getElementById('verify-code').innerText;
          navigator.clipboard.writeText(code).then(function() {
            alert('인증 코드 복사됨: ' + code);
          }, function(err) {
            alert('복사 실패: ' + err);
          });
        }
      </script>
      `
    });


    return res.status(200).json({ message: '인증 코드를 이메일로 전송했습니다.' });
  } catch (error) {
    console.error('[SendEmailVerify Error]', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.emailVerify = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res
        .status(400)
        .json({ message: '이메일과 인증 코드를 모두 입력해주세요.' });
    }

    // Redis에 저장했던 키와 동일하게 생성
    const redisKey = `email:verify:${email}`;
    const storedCode = await redis.get(redisKey);

    if (!storedCode) {
      // 코드가 없거나 TTL이 만료된 경우
      return res
        .status(400)
        .json({ message: '인증 코드가 없거나 만료되었습니다. 다시 요청해주세요.' });
    }

    if (storedCode !== code) {
      // 코드 불일치
      return res
        .status(401)
        .json({ message: '인증 코드가 일치하지 않습니다.' });
    }

    // 검증 성공 시 Redis에서 코드 삭제
    await redis.del(redisKey);

    return res
      .status(200)
      .json({ message: '이메일 인증이 완료되었습니다.' });
  } catch (error) {
    console.error('[Email Verify Error]', error);
    return res
      .status(500)
      .json({ message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
  }
};


exports.login = async (req, res) => {
  console.debug('[LOGIN DEBUG] req.body', req.body);
  console.debug('[LOGIN DEBUG] email', req.body.email);
  console.debug('[LOGIN DEBUG] password length', req.body.password?.length);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: '이메일과 비밀번호는 필수입니다.' });
    }

    // 이메일 형식 검사
    if (!isEmail(email)) {
      return res.status(400).json({ message: '유효한 이메일 형식이 아닙니다.' });
    }

    const user = await getUser(email, password);
    if (!user) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
    }

    const accessToken = jwtUtils.generateAccessToken({ id: user.id });
    const refreshToken = jwtUtils.generateRefreshToken({ id: user.id });

    await redis.set(refreshToken, user.id, { EX: 7 * 24 * 3600 }); // 7일

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
    const stored = await redis.get(refreshToken);

    if (!stored || stored !== decoded.id.toString()) {
      return res.status(403).json({ message: '유효하지 않은 Refresh Token입니다.' });
    }

    const newAccess = jwtUtils.generateAccessToken({ id: decoded.id });
    const newRefresh = jwtUtils.generateRefreshToken({ id: decoded.id });

    await redis.del(refreshToken);
    await redis.set(newRefresh, decoded.id, { EX: 7 * 24 * 3600 });

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

    await redis.del(refreshToken);

    return res.sendStatus(204);
  } catch (error) {
    console.error('[Logout Error]', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};


exports.getGoogleAuthUrl = (req, res) => {
  const { GOOGLE_CLIENT_ID, REDIRECT_URI } = process.env;
  const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=email%20profile&` +
    `access_type=offline&prompt=consent`;
  res.json({ url });
};


exports.googleCallback = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).json({ message: 'code가 없습니다.' });

    // 1️⃣ code → token 교환 요청
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
      }
    });
    const { id_token, access_token } = tokenRes.data;

    // 2️⃣ id_token 검증
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const providerUserId = payload.sub;
    const email = payload.email;
    const name = payload.name;

    // 3️⃣ DB: social identity 조회 또는 생성
    let social = await findSocialIdentity('google', providerUserId);
    let user;
    if (social) {
      user = await getUserByEmail(social.user_id);
    } else {
      const existingUser = await getUserByEmail(email.toLowerCase());
      if (existingUser) {
        // 이미 이메일로 가입된 계정이 있으면 에러 발생
        return res.status(409).json({
          message: '이미 동일 이메일로 가입된 계정이 있습니다. 기존 이메일 계정으로 로그인해주세요.'
        });
      }
      user = email ? await getUserByEmail(email) : null;
      if (!user) {
        user = await createUser({
          email: email || null,
          password: null,
          name: name || 'NoName',
          phone: null
        });
      }
      await createSocialIdentity({
        user_id: user.id,
        provider: 'google',
        provider_user_id: providerUserId,
        access_token,
        refresh_token: tokenRes.data.refresh_token || null,
        token_expires_at: tokenRes.data.expires_in
          ? new Date(Date.now() + tokenRes.data.expires_in * 1000)
          : null,
        profile_data: payload
      });
    }

    // 4️⃣ JWT 토큰 발급
    const accessToken = jwtUtils.generateAccessToken({ id: user.id });
    const refreshToken = jwtUtils.generateRefreshToken({ id: user.id });

    await redis.set(refreshToken, user.id, { EX: 7 * 24 * 3600 }); // 7일

    return res.json({
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('[Google Callback Error]', error.response?.data ?? error);
    return res.status(500).json({ message: 'Google 로그인 처리 중 오류가 발생했습니다.' });
  }
};


exports.getGoogleAuthUrl = (req, res) => {
  const { GOOGLE_CLIENT_ID, REDIRECT_URI } = process.env;
  const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=email%20profile&` +
    `access_type=offline&prompt=consent`;
  res.json({ url });
};


exports.googleCallback = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).json({ message: 'code가 없습니다.' });

    // 1️⃣ code → token 교환 요청
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
      }
    });
    const { id_token, access_token } = tokenRes.data;

    // 2️⃣ id_token 검증
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const providerUserId = payload.sub;
    const email = payload.email;
    const name = payload.name;

    // 3️⃣ DB: social identity 조회 또는 생성
    let social = await findSocialIdentity('google', providerUserId);
    let user;
    if (social) {
      user = await getUserByEmail(social.user_id);
    } else {
      const existingUser = await getUserByEmail(email.toLowerCase());
      if (existingUser) {
        // 이미 이메일로 가입된 계정이 있으면 에러 발생
        return res.status(409).json({
          message: '이미 동일 이메일로 가입된 계정이 있습니다. 기존 이메일 계정으로 로그인해주세요.'
        });
      }
      user = email ? await getUserByEmail(email) : null;
      if (!user) {
        user = await createUser({
          email: email || null,
          password: null,
          name: name || 'NoName',
          phone: null
        });
      }
      await createSocialIdentity({
        user_id: user.id,
        provider: 'google',
        provider_user_id: providerUserId,
        access_token,
        refresh_token: tokenRes.data.refresh_token || null,
        token_expires_at: tokenRes.data.expires_in
          ? new Date(Date.now() + tokenRes.data.expires_in * 1000)
          : null,
        profile_data: payload
      });
    }

    // 4️⃣ JWT 토큰 발급
    const accessToken = jwtUtils.generateAccessToken({ id: user.id });
    const refreshToken = jwtUtils.generateRefreshToken({ id: user.id });
    await jwtUtils.saveRefreshToken(refreshToken, user.id);

    return res.json({
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('[Google Callback Error]', error.response?.data ?? error);
    return res.status(500).json({ message: 'Google 로그인 처리 중 오류가 발생했습니다.' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user?.id ?? req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const [rows] = await db.execute(
      'SELECT id, email, name FROM users WHERE id = ?',
      [userId]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(rows[0]);
  } catch (e) {
    console.error('[GET /auth/me] error:', e);
    res.status(500).json({ message: 'Server error' });
  }
};