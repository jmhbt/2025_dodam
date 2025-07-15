const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dodam API Docs",
      version: "1.0.0",
      description: "출입 및 점검 관리 API 문서",
    },
    servers: [
      {
        url: "http://localhost:3000", // 실제 포트 맞게 수정
      },
    ],
  },
  apis: ["./backend/routes/*.js"], // Swagger 주석이 들어가는 라우터 경로
};

const specs = swaggerJSDoc(options);
module.exports = specs;
