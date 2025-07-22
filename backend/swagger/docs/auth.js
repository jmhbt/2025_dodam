/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 이메일과 패스워드로 로그인하여 JWT 토큰을 받습니다.
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
 *       '200':
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '401':
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이메일 또는 비밀번호가 올바르지 않습니다."
 *                 code:
 *                   type: string
 *                   example: "INVALID_CREDENTIALS"
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 사용자 회원가입
 *     description: 새로운 사용자 계정을 생성합니다.
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
 *               - job_title
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 maxLength: 255
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: "password123"
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 example: "김철수"
 *               phone:
 *                 type: string
 *                 maxLength: 20
 *                 example: "010-1234-5678"
 *               job_title:
 *                 type: string
 *                 maxLength: 50
 *                 example: "개발자"
 *               department:
 *                 type: string
 *                 maxLength: 50
 *                 example: "개발팀"
 *               role:
 *                 type: string
 *                 maxLength: 50
 *                 example: "팀리더"
 *               description:
 *                 type: string
 *                 maxLength: 100
 *                 example: "백엔드 개발 담당"
 *               company_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '201':
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "회원가입이 완료되었습니다."
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이미 등록된 이메일입니다."
 *                 code:
 *                   type: string
 *                   example: "EMAIL_ALREADY_EXISTS"
 */

/**
 * @swagger
 * /auth/social/{provider}:
 *   post:
 *     summary: 소셜 로그인
 *     description: 소셜 플랫폼을 통한 로그인
 *     tags:
 *       - Authentication
 *     security: []
 *     parameters:
 *       - name: provider
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [google, facebook, kakao]
 *         description: 소셜 로그인 제공자
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - access_token
 *             properties:
 *               access_token:
 *                 type: string
 *                 description: 소셜 플랫폼에서 받은 액세스 토큰
 *                 example: "ya29.a0AfH6SMC..."
 *     responses:
 *       '200':
 *         description: 소셜 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 is_new_user:
 *                   type: boolean
 *                   example: false
 *                   description: 신규 사용자 여부
 *       '400':
 *         description: 잘못된 토큰
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "유효하지 않은 액세스 토큰입니다."
 *                 code:
 *                   type: string
 *                   example: "INVALID_TOKEN"
 */