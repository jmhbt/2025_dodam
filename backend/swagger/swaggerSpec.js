const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

// Swagger 옵션 설정
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
- 🔐 사용자 인증 및 관리 (일반 로그인, 소셜 로그인)
- 🏢 회사 정보 관리
- 📝 방문 요청 및 응답 처리
- 📊 점검 폼 생성 및 응답 수집
- 🖼️ 이미지 업로드 및 관리
- 📈 관리자 대시보드 및 통계
- 🚪 방문 로그 (입/출입 기록)

## 인증 방식
- **JWT Bearer Token**: 대부분의 API에서 사용
- **Social Login**: Google, Facebook, Kakao 지원
- **Role-based Access**: 일반 사용자, 관리자 권한 구분

## API 설계 원칙
- **RESTful**: HTTP 메소드와 상태 코드 표준 준수
- **Consistent**: 일관된 응답 형식과 에러 처리
- **Secure**: JWT 토큰 기반 인증 및 권한 관리
- **Scalable**: 페이징 처리로 대용량 데이터 지원

## 데이터베이스 스키마
API는 다음 주요 엔티티들을 관리합니다:
- **Users**: 사용자 정보 및 인증
- **Companies**: 회사 정보
- **Visit Requests**: 방문 요청
- **Visit Responses**: 방문 응답
- **Visit Logs**: 입/출입 로그
- **Inspection Forms**: 점검 폼
- **Form Responses**: 폼 응답 데이터
- **Images**: 업로드된 이미지

## 변경사항 (v2.0.0)
- QR 코드 기능 제거
- 방문 관리 API 세분화 (requests/responses/logs)
- 점검 폼 구조 개선
- 이미지 관리 기능 강화
- 관리자 대시보드 추가
      `,
      termsOfService: 'https://example.com/terms',
      contact: {
        name: 'API Support Team',
        email: 'api-support@example.com',
        url: 'https://example.com/support'
      },
      license: {
        name: 'MIT License',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'https://api.example.com/v1',
        description: 'Production Server'
      },
      {
        url: 'https://staging-api.example.com/v1',
        description: 'Staging Server'
      },
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development Server'
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
        description: '사용자 인증 관련 API - 로그인, 회원가입, 소셜 로그인'
      },
      {
        name: 'Companies',
        description: '회사 관리 API - 회사 등록, 조회, 수정, 삭제'
      },
      {
        name: 'Users',
        description: '사용자 관리 API - 사용자 정보 관리, 승인 처리'
      },
      {
        name: 'Visit Requests',
        description: '방문 요청 관리 API - 방문 신청, 승인/거부'
      },
      {
        name: 'Visit Responses',
        description: '방문 응답 관리 API - 방문 응답 처리'
      },
      {
        name: 'Visit Logs',
        description: '방문 로그 관리 API - 입/출입 기록 관리'
      },
      {
        name: 'Inspection Forms',
        description: '점검 폼 관리 API - 동적 폼 생성 및 관리'
      },
      {
        name: 'Form Responses',
        description: '폼 응답 관리 API - 점검 결과 수집 및 분석'
      },
      {
        name: 'Images',
        description: '이미지 관리 API - 파일 업로드 및 관리'
      },
      {
        name: 'Admin',
        description: '관리자 기능 API - 대시보드, 통계, 시스템 관리'
      }
    ],
    externalDocs: {
      description: 'API 가이드 및 튜토리얼',
      url: 'https://example.com/api-docs'
    }
  },
  apis: [
    // 절대 경로로 API 문서 파일들 지정
    path.join(__dirname, './docs/auth.js'),
    path.join(__dirname, './docs/companies.js'),
    path.join(__dirname, './docs/users.js'),
    path.join(__dirname, './docs/visit_requests.js'),
    path.join(__dirname, './docs/visit_responses.js'),
    path.join(__dirname, './docs/visit_logs.js'),
    path.join(__dirname, './docs/inspection_forms.js'),
    path.join(__dirname, './docs/form_responses.js'),
    path.join(__dirname, './docs/images.js'),
    path.join(__dirname, './docs/admin.js'),
    path.join(__dirname, './docs/schemas.js')
  ]
};

// Swagger 스펙 생성
const specs = swaggerJsdoc(options);

// 추가 메타데이터 설정
specs.info.generatedAt = new Date().toISOString();
specs.info.nodeVersion = process.version;

// API 경로 통계
if (specs.paths) {
  const pathStats = {
    totalPaths: Object.keys(specs.paths).length,
    methodStats: {}
  };

  Object.values(specs.paths).forEach(pathObj => {
    Object.keys(pathObj).forEach(method => {
      if (['get', 'post', 'put', 'patch', 'delete'].includes(method)) {
        pathStats.methodStats[method] = (pathStats.methodStats[method] || 0) + 1;
      }
    });
  });

  specs.info['x-api-stats'] = pathStats;
}

// 스키마 통계
if (specs.components?.schemas) {
  specs.info['x-schema-count'] = Object.keys(specs.components.schemas).length;
}

// 개발 환경에서 추가 정보 포함
if (process.env.NODE_ENV === 'development') {
  specs.info['x-development'] = {
    hot_reload: true,
    debug_mode: true,
    last_updated: new Date().toISOString()
  };
}

// 스펙 검증 함수
function validateSpec() {
  const errors = [];
  
  if (!specs.info?.title) {
    errors.push('Missing API title');
  }
  
  if (!specs.info?.version) {
    errors.push('Missing API version');
  }
  
  if (!specs.paths || Object.keys(specs.paths).length === 0) {
    errors.push('No API paths defined');
  }
  
  if (!specs.components?.schemas || Object.keys(specs.components.schemas).length === 0) {
    errors.push('No schemas defined');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// 스펙 정보 요약 함수
function getSpecSummary() {
  const validation = validateSpec();
  
  return {
    title: specs.info?.title,
    version: specs.info?.version,
    description: specs.info?.description?.split('\n')[0], // 첫 줄만
    servers: specs.servers?.length || 0,
    tags: specs.tags?.length || 0,
    paths: Object.keys(specs.paths || {}).length,
    schemas: Object.keys(specs.components?.schemas || {}).length,
    security_schemes: Object.keys(specs.components?.securitySchemes || {}).length,
    validation,
    generated_at: specs.info?.generatedAt
  };
}

module.exports = {
  specs,
  options,
  validateSpec,
  getSpecSummary
};