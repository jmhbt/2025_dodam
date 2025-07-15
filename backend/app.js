const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger"); // 경로 맞게

// 미들웨어
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 라우터 연결 (예: user.js)
const userRouter = require("./routes/user");
app.use("/users", userRouter);

// 포트 열기
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행됨: http://localhost:${PORT}`);
});
