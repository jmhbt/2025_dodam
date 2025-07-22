/**
 * @swagger
 * /visit/requests:
 *   post:
 *     summary: 방문 신청
 *     description: 외부 업체 사전 방문 신청
 *     tags:
 *       - 방문 관리 (Visit Management)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purpose:
 *                 type: string
 *                 example: "설비 점검"
 *               location:
 *                 type: string
 *                 example: "A동 3층 전기실"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-15"
 *               startTime:
 *                 type: string
 *                 example: "09:00"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-15"
 *               endTime:
 *                 type: string
 *                 example: "17:00"
 *               vehicleNo:
 *                 type: string
 *                 example: "12가3456"
 *               contactPhone:
 *                 type: string
 *                 example: "010-1234-5678"
 *               visitors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "김방문자"
 *                     phone:
 *                       type: string
 *                       example: "010-9876-5432"
 *                     jobTitle:
 *                       type: string
 *                       example: "점검원"
 *             required: [purpose, location, startDate, startTime, endDate, endTime]
 *     responses:
 *       '201':
 *         description: 신청 접수 성공
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
 *                   example: "방문 신청이 접수되었습니다."
 *                 data:
 *                   type: object
 *                   properties:
 *                     visitId:
 *                       type: integer
 *                       example: 1
 *                     status:
 *                       type: string
 *                       example: "pending"
 *       '400':
 *         description: 잘못된 입력
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: 권한 없음
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
 * /visit-request/me:
 *   get:
 *     summary: 방문 신청 목록 조회 (방문자)
 *     description: 로그인된 사용자가 자신의 방문 신청 내역 조회
 *     tags:
 *       - 방문 관리 (Visit Management)
 *       - 사용자 (User)
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
 *           default: 10
 *         description: 한 페이지당 항목 수
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
 *                 message:
 *                   type: string
 *                   example: "방문 신청 목록을 조회했습니다."
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalCount:
 *                       type: integer
 *                       example: 25
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 *                     visitRequests:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           visitId:
 *                             type: integer
 *                             example: 1
 *                           purpose:
 *                             type: string
 *                             example: "제품 설명회"
 *                           location:
 *                             type: string
 *                             example: "회의실 A"
 *                           startDate:
 *                             type: string
 *                             example: "2024-01-15"
 *                           startTime:
 *                             type: string
 *                             example: "09:00"
 *                           endDate:
 *                             type: string
 *                             example: "2024-01-15"
 *                           endTime:
 *                             type: string
 *                             example: "17:00"
 *                           status:
 *                             type: string
 *                             example: "pending"
 *                           requestedAt:
 *                             type: string
 *                             example: "2024-01-10T10:30:00Z"
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
 * /visit-request/{visitId}:
 *   put:
 *     summary: 방문 신청 수정 (방문자)
 *     description: 대기 중인 방문 신청을 수정
 *     tags:
 *       - 방문 관리 (Visit Management)
 *       - 사용자 (User)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: visitId
 *         schema:
 *           type: integer
 *         required: true
 *         description: 방문 신청 ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purpose:
 *                 type: string
 *                 example: "제품 설명회"
 *               location:
 *                 type: string
 *                 example: "회의실 B"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-15"
 *               startTime:
 *                 type: string
 *                 example: "10:00"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-15"
 *               endTime:
 *                 type: string
 *                 example: "16:00"
 *               vehicleNo:
 *                 type: string
 *                 example: "12가3456"
 *               contactPhone:
 *                 type: string
 *                 example: "010-1234-5678"
 *     responses:
 *       '200':
 *         description: 수정 성공
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
 *                   example: "방문 신청이 수정되었습니다."
 *                 data:
 *                   type: object
 *                   properties:
 *                     visitId:
 *                       type: integer
 *                       example: 1
 *                     status:
 *                       type: string
 *                       example: "pending"
 *       '400':
 *         description: 유효하지 않은 입력
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
 *         description: 권한 없음 또는 상태 불가
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
 *   delete:
 *     summary: 방문 신청 취소 (방문자)
 *     description: 대기 중인 방문 신청을 취소
 *     tags:
 *       - 방문 관리 (Visit Management)
 *       - 사용자 (User)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: visitId
 *         schema:
 *           type: integer
 *         required: true
 *         description: 방문 신청 ID
 *         example: 1
 *     responses:
 *       '200':
 *         description: 취소 성공
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
 *                   example: "방문 신청이 취소되었습니다."
 *       '401':
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '403':
 *         description: 권한 없음 또는 상태 불가
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