/**
 * @swagger
 * /users:
 *   get:
 *     summary: 사용자 목록 조회
 *     description: 등록된 사용자 목록을 조회합니다.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: is_accepted
 *         in: query
 *         schema:
 *           type: boolean
 *         description: 승인 상태로 필터링
 *       - name: company_id
 *         in: query
 *         schema:
 *           type: integer
 *         description: 회사 ID로 필터링
 *       - name: system_role
 *         in: query
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: 시스템 역할로 필터링
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: 이름 또는 이메일로 검색
 *     responses:
 *       '200':
 *         description: 사용자 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *   
 *   post:
 *     summary: 사용자 생성
 *     description: 새로운 사용자를 생성합니다 (관리자만 가능).
 *     tags:
 *       - Users
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - job_title
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 maxLength: 255
 *                 example: "user@example.com"
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
 *               system_role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: "user"
 *               description:
 *                 type: string
 *                 maxLength: 100
 *                 example: "백엔드 개발 담당"
 *               company_id:
 *                 type: integer
 *                 example: 1
 *               is_accepted:
 *                 type: boolean
 *                 default: false
 *                 example: true
 *     responses:
 *       '201':
 *         description: 사용자 생성 성공
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
 *                   example: "사용자가 생성되었습니다."
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: 사용자 상세 조회
 *     description: 특정 사용자의 상세 정보를 조회합니다.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '200':
 *         description: 사용자 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - type: object
 *                   properties:
 *                     visit_stats:
 *                       type: object
 *                       properties:
 *                         total_visits:
 *                           type: integer
 *                           example: 25
 *                         last_visit:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-01-15T14:30:00Z"
 *                         pending_requests:
 *                           type: integer
 *                           example: 2
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *   
 *   put:
 *     summary: 사용자 정보 수정
 *     description: 기존 사용자의 정보를 수정합니다.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *               phone:
 *                 type: string
 *                 maxLength: 20
 *               job_title:
 *                 type: string
 *                 maxLength: 50
 *               department:
 *                 type: string
 *                 maxLength: 50
 *               role:
 *                 type: string
 *                 maxLength: 50
 *               description:
 *                 type: string
 *                 maxLength: 100
 *               company_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: 사용자 정보 수정 성공
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
 *                   example: "사용자 정보가 수정되었습니다."
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *   
 *   delete:
 *     summary: 사용자 삭제
 *     description: 사용자를 삭제합니다 (관리자만 가능).
 *     tags:
 *       - Users
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '204':
 *         description: 사용자 삭제 성공
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'

/**
 * @swagger
 * /users/{id}/approve:
 *   patch:
 *     summary: 사용자 승인/거부
 *     description: 관리자가 사용자 가입을 승인하거나 거부합니다.
 *     tags:
 *       - Users
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - is_accepted
 *             properties:
 *               is_accepted:
 *                 type: boolean
 *                 example: true
 *                 description: 승인 여부
 *               reason:
 *                 type: string
 *                 example: "승인되었습니다."
 *                 description: 거부 사유 (거부 시 필수)
 *     responses:
 *       '200':
 *         description: 사용자 승인/거부 처리 성공
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
 *                   example: "사용자가 승인되었습니다."
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: 내 정보 조회
 *     description: 현재 로그인한 사용자의 정보를 조회합니다.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: 내 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - type: object
 *                   properties:
 *                     my_stats:
 *                       type: object
 *                       properties:
 *                         total_visit_requests:
 *                           type: integer
 *                           example: 15
 *                         approved_visits:
 *                           type: integer
 *                           example: 12
 *                         pending_visits:
 *                           type: integer
 *                           example: 2
 *                         rejected_visits:
 *                           type: integer
 *                           example: 1
 *                         form_responses:
 *                           type: integer
 *                           example: 8
 *                         last_activity:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-01-15T14:30:00Z"
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *   
 *   put:
 *     summary: 내 정보 수정
 *     description: 현재 로그인한 사용자의 정보를 수정합니다.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *               phone:
 *                 type: string
 *                 maxLength: 20
 *               job_title:
 *                 type: string
 *                 maxLength: 50
 *               department:
 *                 type: string
 *                 maxLength: 50
 *               role:
 *                 type: string
 *                 maxLength: 50
 *               description:
 *                 type: string
 *                 maxLength: 100
 *     responses:
 *       '200':
 *         description: 내 정보 수정 성공
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
 *                   example: "정보가 수정되었습니다."
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'

/**
 * @swagger
 * /users/pending:
 *   get:
 *     summary: 승인 대기 사용자 목록
 *     description: 관리자가 승인 대기 중인 사용자 목록을 조회합니다.
 *     tags:
 *       - Users
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: company_id
 *         in: query
 *         schema:
 *           type: integer
 *         description: 회사 ID로 필터링
 *     responses:
 *       '200':
 *         description: 승인 대기 사용자 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 summary:
 *                   type: object
 *                   properties:
 *                     total_pending:
 *                       type: integer
 *                       example: 15
 *                     pending_by_company:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           company_name:
 *                             type: string
 *                             example: "테크 컴퍼니"
 *                           count:
 *                             type: integer
 *                             example: 5
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'

/**
 * @swagger
 * /users/company/{company_id}:
 *   get:
 *     summary: 특정 회사의 사용자 목록
 *     description: 특정 회사에 소속된 사용자 목록을 조회합니다.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: company_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 회사 ID
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: is_accepted
 *         in: query
 *         schema:
 *           type: boolean
 *         description: 승인 상태로 필터링
 *     responses:
 *       '200':
 *         description: 회사 소속 사용자 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 company:
 *                   $ref: '#/components/schemas/Company'
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 summary:
 *                   type: object
 *                   properties:
 *                     total_users:
 *                       type: integer
 *                       example: 25
 *                     approved_users:
 *                       type: integer
 *                       example: 20
 *                     pending_users:
 *                       type: integer
 *                       example: 5
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'

/**
 * @swagger
 * /users/stats:
 *   get:
 *     summary: 사용자 통계
 *     description: 관리자가 사용자 관련 통계를 조회합니다.
 *     tags:
 *       - Users
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: period
 *         in: query
 *         schema:
 *           type: string
 *           enum: [today, week, month, quarter, year]
 *           default: month
 *         description: 통계 기간
 *     responses:
 *       '200':
 *         description: 사용자 통계 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_users:
 *                   type: integer
 *                   example: 150
 *                 approved_users:
 *                   type: integer
 *                   example: 130
 *                 pending_users:
 *                   type: integer
 *                   example: 20
 *                 new_registrations:
 *                   type: integer
 *                   example: 8
 *                   description: 해당 기간 내 신규 가입자
 *                 active_users:
 *                   type: integer
 *                   example: 95
 *                   description: 해당 기간 내 활동한 사용자
 *                 registration_trend:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-01-15"
 *                       registrations:
 *                         type: integer
 *                         example: 3
 *                       approvals:
 *                         type: integer
 *                         example: 2
 *                 by_company:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       company_name:
 *                         type: string
 *                         example: "테크 컴퍼니"
 *                       user_count:
 *                         type: integer
 *                         example: 25
 *                       approved_count:
 *                         type: integer
 *                         example: 20
 *                 by_role:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       job_title:
 *                         type: string
 *                         example: "개발자"
 *                       count:
 *                         type: integer
 *                         example: 45
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'

/**
 * @swagger
 * /users/bulk-approve:
 *   patch:
 *     summary: 사용자 일괄 승인
 *     description: 관리자가 여러 사용자를 한 번에 승인합니다.
 *     tags:
 *       - Users
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_ids
 *               - is_accepted
 *             properties:
 *               user_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3, 4, 5]
 *                 description: 처리할 사용자 ID 목록
 *               is_accepted:
 *                 type: boolean
 *                 example: true
 *                 description: 승인 여부
 *               reason:
 *                 type: string
 *                 example: "일괄 승인 처리"
 *                 description: 처리 사유
 *     responses:
 *       '200':
 *         description: 사용자 일괄 승인 성공
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
 *                   example: "5명의 사용자가 승인되었습니다."
 *                 processed_count:
 *                   type: integer
 *                   example: 5
 *                 failed_count:
 *                   type: integer
 *                   example: 0
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: integer
 *                         example: 1
 *                       success:
 *                         type: boolean
 *                         example: true
 *                       message:
 *                         type: string
 *                         example: "승인되었습니다."
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 */