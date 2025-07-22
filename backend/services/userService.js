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
    INSERT INTO users (email, password, name, phone, is_accepted)
    VALUES (?, ?, ?, ?, true)
  `;
  const [result] = await db.execute(sql, [email, password, name, phoneVal]);
  return result.insertId;
};

// 로그인용 사용자 조회 및 비밀번호 확인
exports.getUser = async (email, plainPassword) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) return null;

  const user = rows[0];
  const isMatch = await comparePassword(plainPassword, user.password);
  if (!isMatch) return null;

  return user;
};
