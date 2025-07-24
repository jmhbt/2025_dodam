require('dotenv').config(); 

const express = require("express");
const redisClient = require('./utils/redisClient');
//const userRouter = require('./swagger/docs/user');
const swaggerRouter = require('./swagger/swaggerRouter');
const authRouter = require('./routes/authRoutes');
require('./utils/db'); 

const app = express();


app.use(express.json());

app.use('/auth', authRouter); 

//app.use('/users', userRouter);

app.use('/swagger-docs', swaggerRouter); // 또는 '/docs'

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';  // 이 줄이 반드시 있어야 함

app.listen(PORT, HOST, () => {
  console.log(`✅ 서버 실행됨: http://${HOST}:${PORT}`);
});


