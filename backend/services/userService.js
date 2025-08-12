const db = require('../utils/db');
const { comparePassword } = require('../utils/hashUtils');

// 이메일 중복 체크
exports.checkEmailExists = async (email) => {
  const [rows] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
  return rows.length > 0;
};

// 전화번호 중복 체크 (NULL은 중복 아님)
exports.checkPhoneExists = async (phone) => {
  if (!phone) return false;
  const [rows] = await db.execute('SELECT id FROM users WHERE phone = ?', [phone]);
  return rows.length > 0;
};

// 회원 생성
exports.createUser = async ({ email, password, name, phone }) => {
  const phoneVal = phone ?? null;
  const sql = `
    INSERT INTO users (email, password, name, phone)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.execute(sql, [email, password, name, phoneVal]);
  return result.insertId;
};

// 로그인용 사용자 조회 및 비밀번호 확인 (debug version)
exports.getUser = async (email, plainPassword) => {
  console.log('[LOGIN DEBUG] email:', email);

  const [rows] = await db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  console.log('[LOGIN DEBUG] DB rows:', rows);

  if (rows.length === 0) return null;

  const user = rows[0];
  const isMatch = await comparePassword(plainPassword, user.password);
  console.log('[LOGIN DEBUG] plainPassword match?:', isMatch);

  if (!isMatch) return null;

  return user;
};

// 1. 소셜 아이덴티티 조회 (provider + provider_user_id 기준)
exports.findSocialIdentity = async (provider, providerUserId) => {
  const [rows] = await db.execute(
    `SELECT * FROM social_identities WHERE provider = ? AND provider_user_id = ?`,
    [provider, providerUserId]
  );
  return rows.length > 0 ? rows[0] : null;
};

// 2. 소셜 유저 생성 (users 테이블 + social_identities 테이블)
exports.createSnsUser = async ({ email, name, phone, provider, providerUserId, accessToken, refreshToken, tokenExpiresAt, profileData }) => {
  // users 테이블 생성
  const [userResult] = await db.execute(
    `INSERT INTO users (email, password, name, phone)
     VALUES (?, NULL, ?, ?)`,
    [email, name, phone ?? null]
  );
  const userId = userResult.insertId;

  // social_identities 테이블 생성
  await db.execute(
    `INSERT INTO social_identities (
      user_id, provider, provider_user_id, access_token,
      refresh_token, token_expires_at, profile_data
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      provider,
      providerUserId,
      accessToken,
      refreshToken,
      tokenExpiresAt,
      JSON.stringify(profileData),
    ]
  );

  return userId;
};

// 3. 유저 이메일로 조회
exports.getUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows.length > 0 ? rows[0] : null;
};

// 4. 소셜 아이덴티티 생성만 따로
exports.createSocialIdentity = async ({
  userId,
  provider,
  providerUserId,
  accessToken,
  refreshToken,
  tokenExpiresAt,
  profileData
}) => {
  await db.execute(
    `INSERT INTO social_identities (
      user_id, provider, provider_user_id, access_token,
      refresh_token, token_expires_at, profile_data
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      provider,
      providerUserId,
      accessToken,
      refreshToken,
      tokenExpiresAt,
      JSON.stringify(profileData),
    ]
  );
};
// role이 포함된 유저 정보 반환
exports.getUserById = async (id) => {
  const [rows] = await db.execute(
    'SELECT id, email, name, phone, role FROM users WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};