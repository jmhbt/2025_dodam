/**
 * @swagger
 * /visit-responses:
 *   get:
 *     summary: 방문 응답 목록 조회
 *     description: 방문 응답 목록을 조회합니다.
 *     tags:
 *       - Visit Responses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: request_id
 *         in: query
 *         schema:
 *           type: integer
 *         description: 방문 요청 ID로 필터링
 *       - name: user_id
 *         in: query
 *         schema:
 *           type: integer
 *         description: 사용자 ID로 필터링
 *       - name: is_accepted
 *         in: query
 *         schema:
 *           type: boolean
 *         description: 승인 상태로 필터링
 *     responses:
 *       '200':
 *         description: 방문 응답 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VisitResponse'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *   
 *   post:
 *     summary: 방문 응답 생성
 *     description: 새로운 방문 응답을 생성합니다.
 *     tags:
 *       - Visit Responses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - context
 *               - start_at
 *               - end_at
 *               - request_id
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 100
 *                 example: "방문 승인 요청"
 *               context:
 *                 type: string
 *                 maxLength: 100
 *                 example: "업무 목적 방문"
 *               vehicle_type:
 *                 type: string
 *                 maxLength: 20
 *                 example: "승용차"
 *               vehicle_no:
 *                 type: string
 *                 maxLength: 20
 *                 example: "12가3456"
 *               start_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T09:00:00Z"
 *               end_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T17:00:00Z"
 *               request_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '201':
 *         description: 방문 응답 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VisitResponse'

/**
 * @swagger
 * /visit-responses/{id}:
 *   get:
 *     summary: 방문 응답 상세 조회
 *     description: 특정 방문 응답의 상세 정보를 조회합니다.
 *     tags:
 *       - Visit Responses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '200':
 *         description: 방문 응답 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VisitResponse'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *   
 *   put:
 *     summary: 방문 응답 수정
 *     description: 기존 방문 응답을 수정합니다.
 *     tags:
 *       - Visit Responses
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
 *               title:
 *                 type: string
 *                 maxLength: 100
 *               context:
 *                 type: string
 *                 maxLength: 100
 *               vehicle_type:
 *                 type: string
 *                 maxLength: 20
 *               vehicle_no:
 *                 type: string
 *                 maxLength: 20
 *               start_at:
 *                 type: string
 *                 format: date-time
 *               end_at:
 *                 type: string
 *                 format: date-time
 *               is_editable:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: 방문 응답 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VisitResponse'
 *   
 *   delete:
 *     summary: 방문 응답 삭제
 *     description: 방문 응답을 삭제합니다.
 *     tags:
 *       - Visit Responses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '204':
 *         description: 방문 응답 삭제 성공

/**
 * @swagger
 * /visit-responses/{id}/approve:
 *   patch:
 *     summary: 방문 승인/거부
 *     description: 관리자가 방문 응답을 승인하거나 거부합니다.
 *     tags:
 *       - Visit Responses
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
 *               reason:
 *                 type: string
 *                 example: "승인되었습니다."
 *     responses:
 *       '200':
 *         description: 방문 승인/거부 처리 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VisitResponse'

/**
 * @swagger
 * /visit-responses/me:
 *   get:
 *     summary: 내 방문 응답 목록
 *     description: 현재 로그인한 사용자의 방문 응답 목록을 조회합니다.
 *     tags:
 *       - Visit Responses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: is_accepted
 *         in: query
 *         schema:
 *           type: boolean
 *     responses:
 *       '200':
 *         description: 내 방문 응답 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VisitResponse'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'

/**
 * @swagger
 * /visit-responses/pending:
 *   get:
 *     summary: 승인 대기 방문 응답 목록
 *     description: 관리자가 승인 대기 중인 방문 응답 목록을 조회합니다.
 *     tags:
 *       - Visit Responses
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       '200':
 *         description: 승인 대기 방문 응답 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VisitResponse'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */