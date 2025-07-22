const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// 연결 확인 (초기 실행 시)
(async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping(); // 연결 확인 쿼리
    console.log('✅ MySQL 연결 성공');
    connection.release();
  } catch (err) {
    console.error('❌ MySQL 연결 실패:', err);
  }
})();

module.exports = pool;
