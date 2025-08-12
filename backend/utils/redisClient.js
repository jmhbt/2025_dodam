// redis.cluster.js
require('dotenv').config();
const { createCluster } = require('redis');

const redisClient = createCluster({
  rootNodes: [{ url: process.env.REDIS_URL }],
  defaults: { socket: { tls: true } } // TLS 필수
});

redisClient.on('error', (e) => console.error('🔴 Redis Error:', e));
redisClient.on('connect', () => console.log('🟢 Redis cluster connected'));

(async () => { await redisClient.connect(); })();

module.exports = redisClient;
