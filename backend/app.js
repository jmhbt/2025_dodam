const express = require("express");
const redisClient = require('./utils/redisClient');

const app = express();

const userRouter = require('./swagger/docs/user');
const swaggerRouter = require('./swagger/swaggerRouter');

app.use(express.json());
app.use('/users', userRouter);
app.use('/', swaggerRouter); // 또는 '/docs'

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행됨: http://localhost:${PORT}`);
});

