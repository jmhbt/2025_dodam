require('dotenv').config();
require('./utils/db'); // DB 연결

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerSpec = YAML.load('./api_v2.yaml');

const redisClient = require('./utils/redisClient');

// 라우터 불러오기
const authRouter = require('./routes/authRoutes');
const companiesRouter = require('./routes/companiesRoute');
const healthRouter = require('./routes/healthRoute');

// 앱 초기화
const app = express();

// CORS 허용 도메인 설정
const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URL,
  'http://localhost:5173'
];

// 미들웨어 설정
app.use(cors({
  origin(origin, cb) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      return cb(null, true);
    }
    cb(new Error('CORS 차단: 허용되지 않은 origin'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// 라우트 설정
app.use('/auth', authRouter);
app.use('/companies', companiesRouter);
app.use('/', healthRouter);
//app.use('/users', userRouter); // 필요 시 활성화
app.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ 서버 실행됨: http://localhost:${PORT}`);
});
