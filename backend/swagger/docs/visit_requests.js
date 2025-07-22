/**
 * @swagger
 * /visit-requests:
 *   get:
 *     summary: 방문 요청 목록 조회
 *     description: 방문 요청 목록을 조회합니다.
 *     tags:
 *       - Visit Requests
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
 *       - name: user_id
 *         in: query
 *         schema:
 *           type: integer
 *         description: 사용자 ID로 필터링
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         description: 상태로 필터링
 *       - name: date_from
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *         description: 시작 날짜
 *       - name: date_to
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *         description: 종료 날짜
 *     responses:
 *       '200':
 *         description: 방문 요청 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VisitRequest'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *   
 *   post:
 *     summary: 방문 요청 생성
 *     description: 새로운 방문 요청을 생성합니다.
 *     tags:
 *       - Visit Requests
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VisitRequestCreate'
 *     responses:
 *       '201':
 *         description: 방문 요청 생성 성공
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
 *                   example: "방문 요청이 생성되었습니다."
 *                 data:
 *                   $ref: '#/components/schemas/VisitRequest'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'

/**
 * @swagger
 * /visit-requests/{id}:
 *   get:
 *     summary: 방문 요청 상세 조회
 *     description: 특정 방문 요청의 상세 정보를 조회합니다.
 *     tags:
 *       - Visit Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '200':
 *         description: 방문 요청 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VisitRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *   
 *   put:
 *     summary: 방문 요청 수정
 *     description: 기존 방문 요청을 수정합니다.
 *     tags:
 *       - Visit Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VisitRequestUpdate'
 *     responses:
 *       '200':
 *         description: 방문 요청 수정 성공
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
 *                   example: "방문 요청이 수정되었습니다."
 *                 data:
 *                   $ref: '#/components/schemas/VisitRequest'
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
 *     summary: 방문 요청 삭제
 *     description: 방문 요청을 삭제합니다.
 *     tags:
 *       - Visit Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '204':
 *         description: 방문 요청 삭제 성공
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'

/**
 * @swagger
 * /visit-requests/me:
 *   get:
 *     summary: 내 방문 요청 목록
 *     description: 현재 로그인한 사용자의 방문 요청 목록을 조회합니다.
 *     tags:
 *       - Visit Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         description: 상태로 필터링
 *     responses:
 *       '200':
 *         description: 내 방문 요청 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VisitRequest'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'

/**
 * @swagger
 * /visit-requests/{id}/status:
 *   patch:
 *     summary: 방문 요청 상태 변경
 *     description: 관리자가 방문 요청의 상태를 변경합니다.
 *     tags:
 *       - Visit Requests
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
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [approved, rejected]
 *                 example: "approved"
 *               reason:
 *                 type: string
 *                 example: "승인되었습니다."
 *                 description: 승인/거부 사유
 *               conditions:
 *                 type: string
 *                 example: "안전모 착용 필수"
 *                 description: 승인 조건
 *     responses:
 *       '200':
 *         description: 방문 요청 상태 변경 성공
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
 *                   example: "방문 요청이 승인되었습니다."
 *                 data:
 *                   $ref: '#/components/schemas/VisitRequest'
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
 * /visit-requests/stats:
 *   get:
 *     summary: 방문 요청 통계
 *     description: 관리자가 방문 요청 관련 통계를 조회합니다.
 *     tags:
 *       - Visit Requests
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: period
 *         in: query
 *         schema:
 *           type: string
 *           enum: [today, week, month, year]
 *           default: month
 *         description: 통계 기간
 *     responses:
 *       '200':
 *         description: 방문 요청 통계 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_requests:
 *                   type: integer
 *                   example: 150
 *                 pending_requests:
 *                   type: integer
 *                   example: 25
 *                 approved_requests:
 *                   type: integer
 *                   example: 100
 *                 rejected_requests:
 *                   type: integer
 *                   example: 25
 *                 by_company:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       company_name:
 *                         type: string
 *                         example: "테크 컴퍼니"
 *                       request_count:
 *                         type: integer
 *                         example: 30
 *                 daily_requests:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-01-15"
 *                       count:
 *                         type: integer
 *                         example: 5
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 */