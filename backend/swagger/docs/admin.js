/**
 * @swagger
 * /admin/visit-requests:
 *   get:
 *     summary: 전체 방문 신청 목록 조회 (관리자)
 *     description: 관리자가 모든 방문 신청을 조회
 *     tags:
 *       - 관리자 기능 (Admin)
 *       - 방문 관리 (Visit Management)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected, cancelled]
 *       - in: query
 *         name: company
 *         schema:
 *           type: string
 *         description: 회사명으로 필터링
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     visitRequests:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/VisitRequestAdmin'
 *                     totalCount:
 *                       type: integer
 *                       example: 100
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 */

/**
 * @swagger
 * /admin/visit-requests/{id}:
 *   get:
 *     summary: 방문 신청 상세 조회 (관리자)
 *     description: 관리자가 특정 방문 신청의 상세 정보를 조회
 *     tags:
 *       - 관리자 기능 (Admin)
 *       - 방문 관리 (Visit Management)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 방문 신청 ID
 *     responses:
 *       '200':
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/VisitRequestAdmin'
 */

/**
 * @swagger
 * /admin/visit-requests/{id}/status:
 *   put:
 *     summary: 방문 신청 승인/반려 처리
 *     description: 관리자가 방문 신청을 승인하거나 반려
 *     tags:
 *       - 관리자 기능 (Admin)
 *       - 방문 관리 (Visit Management)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 방문 신청 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [approved, rejected]
 *                 example: "approved"
 *               comment:
 *                 type: string
 *                 example: "승인되었습니다. A동 출입구로 오시기 바랍니다."
 *               conditions:
 *                 type: string
 *                 example: "안전모 착용 필수"
 *             required: [status]
 *     responses:
 *       '200':
 *         description: 처리 성공
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
 *                   example: "방문 신청이 승인되었습니다."
 *                 data:
 *                   type: object
 *                   properties:
 *                     visitId:
 *                       type: integer
 *                       example: 1
 *                     status:
 *                       type: string
 *                       example: "approved"
 *                     qrGenerated:
 *                       type: boolean
 *                       example: true
 */

/**
 * @swagger
 * /admin/visit-requests/{id}/qrcode:
 *   post:
 *     summary: QR 코드 생성 요청
 *     description: 관리자가 승인된 방문에 대해 QR 코드를 생성
 *     tags:
 *       - 관리자 기능 (Admin)
 *       - QR 코드 (QR Code)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 방문 신청 ID
 *     responses:
 *       '201':
 *         description: QR 코드 생성 성공
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
 *                   example: "QR 코드가 생성되었습니다."
 *                 data:
 *                   type: object
 *                   properties:
 *                     qrCodeId:
 *                       type: string
 *                       example: "QR_001_20240115"
 *                     qrCode:
 *                       type: string
 *                       example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 */

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: 관리자 대시보드
 *     description: 방문 현황, 통계 등 대시보드 데이터 조회
 *     tags:
 *       - 관리자 기능 (Admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     todayVisits:
 *                       type: integer
 *                       example: 15
 *                     pendingRequests:
 *                       type: integer
 *                       example: 8
 *                     activeVisitors:
 *                       type: integer
 *                       example: 5
 *                     monthlyStats:
 *                       type: object
 *                       properties:
 *                         totalVisits:
 *                           type: integer
 *                           example: 120
 *                         approvedRequests:
 *                           type: integer
 *                           example: 98
 *                         rejectedRequests:
 *                           type: integer
 *                           example: 22
 *                     recentActivity:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: "visit_request"
 *                           message:
 *                             type: string
 *                             example: "홍길동님이 방문 신청을 하였습니다."
 *                           timestamp:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-01-15T10:30:00Z"
 */