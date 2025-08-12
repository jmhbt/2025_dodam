// redis.cluster.js
require('dotenv').config();
const { createCluster } = require('redis');

const redis = createCluster({
  rootNodes: [{ url: process.env.REDIS_URL }],
  defaults: { socket: { tls: true } } // TLS 필수
});

redis.on('error', (e) => console.error('🔴 Redis Error:', e));
redis.on('connect', () => console.log('🟢 Redis cluster connected'));

(async () => { await redis.connect(); })();

module.exports = redisClient;
