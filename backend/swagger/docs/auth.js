/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 123
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         name:
 *           type: string
 *           example: "홍길동"
 *         phone:
 *           type: string
 *           example: "010-1234-5678"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-07-29T12:34:56Z"
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 사용자 회원가입
 *     description: 이메일, 비밀번호, 이름, 전화번호를 받아 새 사용자 계정을 생성합니다.
 *     tags:
 *       - Authentication
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - phone
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *               name:
 *                 type: string
 *                 example: "홍길동"
 *               phone:
 *                 type: string
 *                 example: "010-1234-5678"
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원가입 성공"
 *       400:
 *         description: 필수 입력값 누락 또는 형식 오류
 *       409:
 *         description: 이미 존재하는 이메일 또는 전화번호
 */

/**
 * @swagger
 * /auth/send-email-verify:
 *   post:
 *     summary: 이메일 인증 코드 발송
 *     description: 가입 전 중복 확인된 이메일로 6자리 인증 코드를 발송하고 Redis에 저장합니다.
 *     tags:
 *       - Authentication
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: 인증 코드 발송 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "인증 코드를 이메일로 전송했습니다."
 *       400:
 *         description: 이메일 누락 또는 형식 오류
 *       409:
 *         description: 이미 존재하는 이메일
 */

/**
 * @swagger
 * /auth/email-verify:
 *   post:
 *     summary: 이메일 인증 코드 검증
 *     description: 사용자가 입력한 인증 코드를 Redis에 저장된 값과 비교하여 검증합니다.
 *     tags:
 *       - Authentication
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: 인증 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이메일 인증이 완료되었습니다."
 *       400:
 *         description: 코드 누락, 만료 또는 없음
 *       401:
 *         description: 코드 불일치
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 이메일과 비밀번호로 로그인 후 JWT accessToken과 refreshToken을 반환합니다.
 *     tags:
 *       - Authentication
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 refreshToken:
 *                   type: string
 *                   example: "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4..."
 *       400:
 *         description: 이메일 또는 비밀번호 누락/형식 오류
 *       401:
 *         description: 자격 증명 불일치
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: 액세스 토큰 재발급
 *     description: refreshToken을 검증하고 새 accessToken과 refreshToken을 발급합니다.
 *     tags:
 *       - Authentication
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4..."
 *     responses:
 *       200:
 *         description: 토큰 재발급 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: refreshToken 누락
 *       403:
 *         description: refreshToken 검증 실패
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: 로그아웃
 *     description: refreshToken을 삭제하여 세션을 종료합니다.
 *     tags:
 *       - Authentication
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       204:
 *         description: 로그아웃 성공 (콘텐츠 없음)
 *       400:
 *         description: refreshToken 누락
 */
