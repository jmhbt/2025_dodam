/**
 * @swagger
 * /export/visit-records:
 *   get:
 *     summary: 방문 기록 엑셀 내보내기
 *     description: 방문 기록을 엑셀 파일로 내보내기
 *     tags:
 *       - 데이터 내보내기 (Export)
 *       - 관리자 기능 (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected, cancelled]
 *         description: 상태 필터
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [excel, csv]
 *           default: excel
 *         description: 파일 형식
 *     responses:
 *       '200':
 *         description: 내보내기 성공
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 */

/**
 * @swagger
 * /export/inspection-records:
 *   get:
 *     summary: 점검 기록 내보내기
 *     description: 점검 기록을 엑셀 또는 CSV로 내보내기
 *     tags:
 *       - 데이터 내보내기 (Export)
 *       - 관리자 기능 (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *       - in: query
 *         name: inspector
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [completed, incomplete, issue_found]
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [excel, csv]
 *           default: excel
 *     responses:
 *       '200':
 *         description: 내보내기 성공
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 */