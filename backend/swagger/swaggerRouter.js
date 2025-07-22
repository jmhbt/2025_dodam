const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger 문서 파일들 import
const authDocs = require('./docs/auth');
const companiesDocs = require('./docs/companies');
const usersDocs = require('./docs/users');
const visitRequestsDocs = require('./docs/visit-requests');
const visitResponsesDocs = require('./docs/visit-responses');
const visitLogsDocs = require('./docs/visit-logs');
const inspectionFormsDocs = require('./docs/inspection-forms');
const formResponsesDocs = require('./docs/form-responses');
const imagesDocs = require('./docs/images');
const adminDocs = require('./docs/admin');
const schemasDocs = require('./docs/schemas');

const router = express.Router();

// Swagger 설정
const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Visit Management API',
      version: '2.0.0',
      description: `
# 방문 관리 및 점검 폼 시스템 API

이 API는 회사 방문 요청, 승인, 점검 폼 작성 등의 기능을 제공합니다.

## 주요 기능
- 사용자 및 회사 관리
- 방문 요청 및 응답 처리  
- 점검 폼 생성 및 응답 수집
- 이미지 업로드 및 관리
- 소셜 로그인 지원
- 관리자 대시보드

## 인증 방식
모든 API는 JWT Bearer 토큰을 사용한 인증이 필요합니다. (로그인 및 회원가입 제외)

\`\`\`
Authorization: Bearer <your_jwt_token>
\`\`\`

## API 버전
현재 버전: v2.0.0 (API v2.yaml 기반)
      `,
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'https://api.example.com/v1',
        description: 'Production server'
      },
      {
        url: 'https://staging-api.example.com/v1', 
        description: 'Staging server'
      },
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: [
      {
        name: 'Authentication',
        description: '사용자 인증 관련 API'
      },
      {
        name: 'Companies', 
        description: '회사 관리 API'
      },
      {
        name: 'Users',
        description: '사용자 관리 API'
      },
      {
        name: 'Visit Requests',
        description: '방문 요청 관리 API'
      },
      {
        name: 'Visit Responses',
        description: '방문 응답 관리 API'
      },
      {
        name: 'Visit Logs',
        description: '방문 로그 관리 API'
      },
      {
        name: 'Inspection Forms',
        description: '점검 폼 관리 API'
      },
      {
        name: 'Form Responses',
        description: '폼 응답 관리 API'
      },
      {
        name: 'Images',
        description: '이미지 업로드 및 관리 API'
      },
      {
        name: 'Admin',
        description: '관리자 기능 API'
      }
    ]
  },
  apis: [
    './swagger/docs/auth.js',
    './swagger/docs/companies.js', 
    './swagger/docs/users.js',
    './swagger/docs/visit-requests.js',
    './swagger/docs/visit-responses.js',
    './swagger/docs/visit-logs.js',
    './swagger/docs/inspection-forms.js',
    './swagger/docs/form-responses.js',
    './swagger/docs/images.js',
    './swagger/docs/admin.js',
    './swagger/docs/schemas.js'
  ]
};

// Swagger 스펙 생성
const specs = swaggerJsdoc(options);

// Swagger UI 설정
const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    docExpansion: 'none', // 기본적으로 모든 섹션 접기
    filter: true, // 검색 기능 활성화
    showRequestHeaders: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
    requestSnippetsEnabled: true,
    syntaxHighlight: {
      activated: true,
      theme: 'monokai'
    },
    tagsSorter: 'alpha', // 태그 알파벳 순 정렬
    operationsSorter: 'method' // HTTP 메소드 순으로 정렬
  },
  customCss: `
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info { margin: 20px 0; }
    .swagger-ui .scheme-container { margin: 20px 0; padding: 10px 0; }
    .swagger-ui .info .title { color: #3b4151; font-size: 36px; }
    .swagger-ui .info .description { color: #3b4151; }
    .swagger-ui .btn.authorize { 
      background-color: #49cc90; 
      border-color: #49cc90; 
    }
    .swagger-ui .btn.authorize:hover { 
      background-color: #41b883; 
      border-color: #41b883; 
    }
  `,
  customSiteTitle: 'Visit Management API Documentation',
  customfavIcon: '/favicon.ico'
};

// Swagger UI 라우트 설정
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs, swaggerUiOptions));

// JSON 스펙 제공 (Postman 등에서 import 가능)
router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

// YAML 스펙 제공
router.get('/yaml', (req, res) => {
  const yaml = require('js-yaml');
  res.setHeader('Content-Type', 'text/yaml');
  res.send(yaml.dump(specs));
});

// API 상태 확인
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Swagger documentation is running',
    version: specs.info.version,
    timestamp: new Date().toISOString(),
    endpoints: {
      docs: '/swagger-docs',
      json: '/swagger-docs/json', 
      yaml: '/swagger-docs/yaml'
    }
  });
});

// 스펙 정보 제공
router.get('/info', (req, res) => {
  res.json({
    info: specs.info,
    servers: specs.servers,
    tags: specs.tags.map(tag => ({
      name: tag.name,
      description: tag.description
    })),
    paths_count: Object.keys(specs.paths || {}).length,
    schemas_count: Object.keys(specs.components?.schemas || {}).length,
    generated_at: new Date().toISOString()
  });
});

module.exports = router;