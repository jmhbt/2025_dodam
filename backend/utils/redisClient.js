require('dotenv').config();
const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => {
  console.error('🔴 Redis Error:', err);
});

redisClient.connect().then(() => {
  console.log('🟢 Redis connected');
});

module.exports = redisClient;
