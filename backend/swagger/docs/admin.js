\/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: 관리자 대시보드
 *     description: 방문 현황, 통계 등 대시보드 데이터를 조회합니다.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: 대시보드 데이터 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 today_visits:
 *                   type: integer
 *                   example: 15
 *                 pending_requests:
 *                   type: integer
 *                   example: 8
 *                 active_visitors:
 *                   type: integer
 *                   example: 5
 *                 pending_users:
 *                   type: integer
 *                   example: 3
 *                 monthly_stats:
 *                   type: object
 *                   properties:
 *                     total_visits:
 *                       type: integer
 *                       example: 120
 *                     approved_requests:
 *                       type: integer
 *                       example: 98
 *                     rejected_requests:
 *                       type: integer
 *                       example: 22
 *                     new_users:
 *                       type: integer
 *                       example: 15
 *                 recent_activity:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         enum: [visit_request, user_registration, form_submission]
 *                         example: "visit_request"
 *                       message:
 *                         type: string
 *                         example: "홍길동님이 방문 신청을 하였습니다."
 *                       user_name:
 *                         type: string
 *                         example: "홍길동"
 *                       company_name:
 *                         type: string
 *                         example: "테크 컴퍼니"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00Z"

/**
 * @swagger
 * /admin/visit-requests:
 *   get:
 *     summary: 전체 방문 신청 목록 조회 (관리자)
 *     description: 관리자가 모든 방문 신청을 조회합니다.
 *     tags:
 *       - Admin
 *       - Visit Management
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
 *       - name: company_id
 *         in: query
 *         schema:
 *           type: integer
 *       - name: date_from
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *       - name: date_to
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: 방문 신청 목록 조회 성공
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
 *                 summary:
 *                   type: object
 *                   properties:
 *                     total_count:
 *                       type: integer
 *                       example: 100
 *                     pending_count:
 *                       type: integer
 *                       example: 25
 *                     approved_count:
 *                       type: integer
 *                       example: 60
 *                     rejected_count:
 *                       type: integer
 *                       example: 15

/**
 * @swagger
 * /admin/visit-requests/{id}:
 *   get:
 *     summary: 방문 신청 상세 조회 (관리자)
 *     description: 관리자가 특정 방문 신청의 상세 정보를 조회합니다.
 *     tags:
 *       - Admin
 *       - Visit Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '200':
 *         description: 방문 신청 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/VisitRequest'
 *                 - type: object
 *                   properties:
 *                     visit_responses:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/VisitResponse'
 *                     form_responses:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/FormResponse'

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: 전체 사용자 목록 조회 (관리자)
 *     description: 관리자가 모든 사용자를 조회합니다.
 *     tags:
 *       - Admin
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: is_accepted
 *         in: query
 *         schema:
 *           type: boolean
 *       - name: company_id
 *         in: query
 *         schema:
 *           type: integer
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
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
 *                 summary:
 *                   type: object
 *                   properties:
 *                     total_users:
 *                       type: integer
 *                       example: 150
 *                     approved_users:
 *                       type: integer
 *                       example: 130
 *                     pending_users:
 *                       type: integer
 *                       example: 20

/**
 * @swagger
 * /admin/companies:
 *   get:
 *     summary: 전체 회사 목록 조회 (관리자)
 *     description: 관리자가 모든 회사를 조회합니다.
 *     tags:
 *       - Admin
 *       - Company Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 회사 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     allOf:
 *                       - $ref: '#/components/schemas/Company'
 *                       - type: object
 *                         properties:
 *                           user_count:
 *                             type: integer
 *                             example: 25
 *                           recent_visit_count:
 *                             type: integer
 *                             example: 5
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'

/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: 전체 시스템 통계
 *     description: 관리자가 시스템 전체 통계를 조회합니다.
 *     tags:
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
 *     responses:
 *       '200':
 *         description: 시스템 통계 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 150
 *                     approved:
 *                       type: integer
 *                       example: 130
 *                     pending:
 *                       type: integer
 *                       example: 20
 *                     new_registrations:
 *                       type: integer
 *                       example: 5
 *                 companies:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 50
 *                     active:
 *                       type: integer
 *                       example: 45
 *                 visits:
 *                   type: object
 *                   properties:
 *                     total_requests:
 *                       type: integer
 *                       example: 200
 *                     approved_requests:
 *                       type: integer
 *                       example: 180
 *                     rejected_requests:
 *                       type: integer
 *                       example: 20
 *                     completed_visits:
 *                       type: integer
 *                       example: 150
 *                 forms:
 *                   type: object
 *                   properties:
 *                     total_forms:
 *                       type: integer
 *                       example: 25
 *                     total_responses:
 *                       type: integer
 *                       example: 300
 *                     avg_response_rate:
 *                       type: number
 *                       format: float
 *                       example: 85.5

/**
 * @swagger
 * /admin/logs:
 *   get:
 *     summary: 시스템 로그 조회
 *     description: 관리자가 시스템 활동 로그를 조회합니다.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: action_type
 *         in: query
 *         schema:
 *           type: string
 *           enum: [login, logout, visit_request, form_submission, user_approval]
 *       - name: user_id
 *         in: query
 *         schema:
 *           type: integer
 *       - name: date_from
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *       - name: date_to
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: 시스템 로그 조회 성공
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
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       action_type:
 *                         type: string
 *                         example: "visit_request"
 *                       description:
 *                         type: string
 *                         example: "사용자가 방문 요청을 생성했습니다."
 *                       user_id:
 *                         type: integer
 *                         example: 1
 *                       user_name:
 *                         type: string
 *                         example: "김철수"
 *                       ip_address:
 *                         type: string
 *                         example: "192.168.1.100"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00Z"
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */