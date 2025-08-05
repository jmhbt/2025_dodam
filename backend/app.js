require('dotenv').config(); 

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerSpec = YAML.load('./api_v2.yaml');
const express = require("express");
const redisClient = require('./utils/redisClient');
//const userRouter = require('./swagger/docs/user');
const swaggerRouter = require('./swagger/swaggerRouter');
const authRouter = require('./routes/authRoutes');
const companiesRouter = require('./routes/companies');
require('./utils/db'); 

const app = express();


app.use(express.json());
app.use('/auth', authRouter); 
app.use('/companies', companiesRouter);
//app.use('/users', userRouter);
app.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // 또는 '/docs'

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ 서버 실행됨: http://localhost:${PORT}`);
});


