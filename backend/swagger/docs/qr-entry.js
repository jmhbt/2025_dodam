/**
 * @swagger
 * /visit-requests/{visitId}/qrcode:
 *   get:
 *     summary: 방문자 QR 코드 조회
 *     description: 승인된 방문자가 자신의 QR 코드를 조회
 *     tags:
 *       - 방문 관리 (Visit Management)
 *       - QR 코드 (QR Code)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: visitId
 *         schema:
 *           type: integer
 *         required: true
 *         description: 방문 신청 ID
 *     responses:
 *       '200':
 *         description: QR 코드 조회 성공
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
 *                     qrCode:
 *                       type: string
 *                       example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 *                     qrData:
 *                       type: string
 *                       example: "VISIT_REQ_001_20240115_APPROVED"
 *                     expiresAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T23:59:59Z"
 *       '401':
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '403':
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: 방문 신청을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /qr/validate:
 *   post:
 *     summary: QR 코드 유효성 검증
 *     description: 스캔된 QR 코드의 유효성을 검증
 *     tags:
 *       - QR 코드 (QR Code)
 *       - 출입 관리 (Entry Management)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               qrData:
 *                 type: string
 *                 example: "VISIT_REQ_001_20240115_APPROVED"
 *               deviceId:
 *                 type: string
 *                 example: "GATE_001"
 *               location:
 *                 type: string
 *                 example: "A동 출입구"
 *             required: [qrData]
 *     responses:
 *       '200':
 *         description: 검증 성공
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
 *                     valid:
 *                       type: boolean
 *                       example: true
 *                     visitRequest:
 *                       $ref: '#/components/schemas/VisitRequest'
 *                     visitor:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "홍길동"
 *                         company:
 *                           type: string
 *                           example: "ABC 회사"
 *                         phone:
 *                           type: string
 *                           example: "010-1234-5678"
 *       '400':
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /visit-entry/scan:
 *   post:
 *     summary: QR 스캔 처리
 *     description: QR 코드 스캔을 통한 출입 처리
 *     tags:
 *       - 출입 관리 (Entry Management)
 *       - QR 코드 (QR Code)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               qrData:
 *                 type: string
 *                 example: "VISIT_REQ_001_20240115_APPROVED"
 *               type:
 *                 type: string
 *                 enum: [entry, exit]
 *                 example: "entry"
 *               deviceId:
 *                 type: string
 *                 example: "GATE_001"
 *               location:
 *                 type: string
 *                 example: "A동 출입구"
 *             required: [qrData, type]
 *     responses:
 *       '200':
 *         description: 스캔 처리 성공
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
 *                   example: "출입이 승인되었습니다."
 *                 data:
 *                   type: object
 *                   properties:
 *                     entryLogId:
 *                       type: integer
 *                       example: 1
 *                     visitRequestId:
 *                       type: integer
 *                       example: 1
 *                     entryTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T09:00:00Z"
 *                     visitor:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "홍길동"
 *                         company:
 *                           type: string
 *                           example: "ABC 회사"
 *       '400':
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '403':
 *         description: 권한 없음 또는 QR 코드 만료
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /visit-entry/{id}/confirm:
 *   put:
 *     summary: 출입 승인 확인
 *     description: 관리자가 출입을 최종 승인 또는 거부
 *     tags:
 *       - 출입 관리 (Entry Management)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 출입 로그 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               approved:
 *                 type: boolean
 *                 example: true
 *               note:
 *                 type: string
 *                 example: "신분증 확인 완료"
 *             required: [approved]
 *     responses:
 *       '200':
 *         description: 승인 처리 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '400':
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '403':
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: 출입 로그를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /visit-logs:
 *   get:
 *     summary: 출입 이력 조회
 *     description: 출입 로그 목록을 조회
 *     tags:
 *       - 출입 관리 (Entry Management)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: 한 페이지당 항목 수
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [entry, exit]
 *         description: 출입 유형 필터
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: 시작 날짜
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: 종료 날짜
 *       - in: query
 *         name: company
 *         schema:
 *           type: string
 *         description: 회사명 필터
 *       - in: query
 *         name: visitor
 *         schema:
 *           type: string
 *         description: 방문자명 필터
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
 *                     logs:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/VisitLog'
 *                     totalCount:
 *                       type: integer
 *                       example: 150
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 8
 *       '401':
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */