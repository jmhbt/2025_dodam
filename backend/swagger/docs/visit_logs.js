/**
 * @swagger
 * /visit-logs:
 *   get:
 *     summary: 방문 로그 목록 조회
 *     description: 입/출입 기록을 조회합니다.
 *     tags:
 *       - Visit Logs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: type
 *         in: query
 *         schema:
 *           type: string
 *           enum: [entry, exit]
 *         description: 로그 타입으로 필터링
 *       - name: user_id
 *         in: query
 *         schema:
 *           type: integer
 *         description: 사용자 ID로 필터링
 *       - name: response_id
 *         in: query
 *         schema:
 *           type: integer
 *         description: 방문 응답 ID로 필터링
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
 *         description: 방문 로그 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VisitLog'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 summary:
 *                   type: object
 *                   properties:
 *                     total_entries:
 *                       type: integer
 *                       example: 50
 *                     total_exits:
 *                       type: integer
 *                       example: 45
 *                     current_visitors:
 *                       type: integer
 *                       example: 5
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *   
 *   post:
 *     summary: 방문 로그 생성
 *     description: 새로운 입/출입 로그를 생성합니다.
 *     tags:
 *       - Visit Logs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - user_id
 *               - response_id
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [entry, exit]
 *                 example: "entry"
 *                 description: 로그 타입
 *               user_id:
 *                 type: integer
 *                 example: 1
 *                 description: 사용자 ID
 *               response_id:
 *                 type: integer
 *                 example: 1
 *                 description: 방문 응답 ID
 *               issued_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T09:00:00Z"
 *                 description: 로그 발생 시간 (미제공시 현재 시간)
 *     responses:
 *       '201':
 *         description: 방문 로그 생성 성공
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
 *                   example: "입장 로그가 생성되었습니다."
 *                 data:
 *                   $ref: '#/components/schemas/VisitLog'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'

/**
 * @swagger
 * /visit-logs/{id}:
 *   get:
 *     summary: 방문 로그 상세 조회
 *     description: 특정 방문 로그의 상세 정보를 조회합니다.
 *     tags:
 *       - Visit Logs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '200':
 *         description: 방문 로그 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VisitLog'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *   
 *   delete:
 *     summary: 방문 로그 삭제
 *     description: 방문 로그를 삭제합니다 (관리자만 가능).
 *     tags:
 *       - Visit Logs
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '204':
 *         description: 방문 로그 삭제 성공
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'

/**
 * @swagger
 * /visit-logs/user/{user_id}:
 *   get:
 *     summary: 특정 사용자의 방문 로그
 *     description: 특정 사용자의 모든 방문 로그를 조회합니다.
 *     tags:
 *       - Visit Logs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 사용자 ID
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: type
 *         in: query
 *         schema:
 *           type: string
 *           enum: [entry, exit]
 *         description: 로그 타입으로 필터링
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
 *         description: 사용자 방문 로그 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VisitLog'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 summary:
 *                   type: object
 *                   properties:
 *                     total_visits:
 *                       type: integer
 *                       example: 15
 *                     entries_count:
 *                       type: integer
 *                       example: 8
 *                     exits_count:
 *                       type: integer
 *                       example: 7
 *                     is_currently_inside:
 *                       type: boolean
 *                       example: true
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'

/**
 * @swagger
 * /visit-logs/response/{response_id}:
 *   get:
 *     summary: 특정 방문 응답의 로그
 *     description: 특정 방문 응답에 대한 모든 로그를 조회합니다.
 *     tags:
 *       - Visit Logs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: response_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 방문 응답 ID
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       '200':
 *         description: 방문 응답 로그 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 visit_response:
 *                   $ref: '#/components/schemas/VisitResponse'
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VisitLog'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 timeline:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         enum: [entry, exit]
 *                         example: "entry"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T09:00:00Z"
 *                       user_name:
 *                         type: string
 *                         example: "김철수"
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'

/**
 * @swagger
 * /visit-logs/current-visitors:
 *   get:
 *     summary: 현재 방문자 목록
 *     description: 현재 건물 내에 있는 방문자 목록을 조회합니다.
 *     tags:
 *       - Visit Logs
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
 *         description: 현재 방문자 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         $ref: '#/components/schemas/User'
 *                       entry_log:
 *                         $ref: '#/components/schemas/VisitLog'
 *                       visit_response:
 *                         $ref: '#/components/schemas/VisitResponse'
 *                       duration_minutes:
 *                         type: integer
 *                         example: 120
 *                         description: 현재까지 체류 시간(분)
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 summary:
 *                   type: object
 *                   properties:
 *                     total_visitors:
 *                       type: integer
 *                       example: 5
 *                     by_company:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           company_name:
 *                             type: string
 *                             example: "테크 컴퍼니"
 *                           visitor_count:
 *                             type: integer
 *                             example: 2
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'

/**
 * @swagger
 * /visit-logs/stats:
 *   get:
 *     summary: 방문 로그 통계
 *     description: 관리자가 방문 로그 통계를 조회합니다.
 *     tags:
 *       - Visit Logs
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
 *       - name: group_by
 *         in: query
 *         schema:
 *           type: string
 *           enum: [hour, day, week, month]
 *           default: day
 *         description: 그룹화 단위
 *     responses:
 *       '200':
 *         description: 방문 로그 통계 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 period_summary:
 *                   type: object
 *                   properties:
 *                     total_entries:
 *                       type: integer
 *                       example: 200
 *                     total_exits:
 *                       type: integer
 *                       example: 195
 *                     unique_visitors:
 *                       type: integer
 *                       example: 80
 *                     avg_visit_duration:
 *                       type: integer
 *                       example: 180
 *                       description: 평균 방문 시간(분)
 *                 time_series:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-01-15"
 *                       entries:
 *                         type: integer
 *                         example: 12
 *                       exits:
 *                         type: integer
 *                         example: 10
 *                 peak_hours:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       hour:
 *                         type: integer
 *                         example: 9
 *                       entry_count:
 *                         type: integer
 *                         example: 15
 *                 top_visitors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         $ref: '#/components/schemas/User'
 *                       visit_count:
 *                         type: integer
 *                         example: 8
 *                       total_duration:
 *                         type: integer
 *                         example: 1200
 *                         description: 총 방문 시간(분)
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'

/**
 * @swagger
 * /visit-logs/export:
 *   get:
 *     summary: 방문 로그 내보내기
 *     description: 방문 로그를 CSV 또는 Excel 파일로 내보냅니다.
 *     tags:
 *       - Visit Logs
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: format
 *         in: query
 *         schema:
 *           type: string
 *           enum: [csv, excel]
 *           default: excel
 *         description: 파일 형식
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
 *       - name: type
 *         in: query
 *         schema:
 *           type: string
 *           enum: [entry, exit]
 *         description: 로그 타입 필터
 *       - name: user_id
 *         in: query
 *         schema:
 *           type: integer
 *         description: 특정 사용자 필터
 *     responses:
 *       '200':
 *         description: 방문 로그 내보내기 성공
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 */