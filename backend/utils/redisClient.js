// utils/redisClient.js
const { createClient } = require('redis');

const url = process.env.REDIS_URL;        // rediss://<endpoint>:6379  (TLS 스킴 중요)
const username = process.env.REDIS_USERNAME; // ElastiCache RBAC 사용자명
const password = process.env.REDIS_PASSWORD; // 해당 사용자 비밀번호(토큰)

if (!url) throw new Error('REDIS_URL is not set');

const redis = createClient({
  url,                       // 예: rediss://dodam-redis-xxxx.serverless.use1.cache.amazonaws.com:6379
  username,                  // ★ Serverless는 RBAC 필수
  password,
  socket: { tls: true }      // ★ TLS 필수
});

redis.on('connect', () => console.log('🟢 Redis connected'));
redis.on('error', (e) => console.error('🔴 Redis Error:', e));

async function connectRedis() {
  if (!redis.isOpen) await redis.connect();
}
module.exports = { redis, connectRedis };
