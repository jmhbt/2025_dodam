/**
 * @swagger
 * /inspection-templates:
 *   get:
 *     summary: 점검 템플릿 목록 조회
 *     description: 사용 가능한 점검 템플릿 목록을 조회
 *     tags:
 *       - 설비 점검 (Inspection)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: 특정 위치 필터링
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: 설비 카테고리
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InspectionTemplate'
 *   post:
 *     summary: 새 점검 템플릿 생성
 *     description: 관리자가 새로운 점검 템플릿을 생성
 *     tags:
 *       - 설비 점검 (Inspection)
 *       - 관리자 기능 (Admin)
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
 *                 example: "전기 설비 점검 템플릿"
 *               description:
 *                 type: string
 *                 example: "A동 전기실 일반 점검 항목"
 *               location:
 *                 type: string
 *                 example: "A동 3층 전기실"
 *               category:
 *                 type: string
 *                 example: "전기설비"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "메인 분전반 상태 확인"
 *                     description:
 *                       type: string
 *                       example: "분전반 표시등 정상 작동 여부 확인"
 *                     type:
 *                       type: string
 *                       enum: [checkbox, text, number, photo]
 *                       example: "checkbox"
 *                     required:
 *                       type: boolean
 *                       example: true
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["정상", "이상", "점검 필요"]
 *             required: [name, location, category, items]
 *     responses:
 *       '201':
 *         description: 생성 성공
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
 *                   example: "점검 템플릿이 생성되었습니다."
 *                 data:
 *                   type: object
 *                   properties:
 *                     templateId:
 *                       type: integer
 *                       example: 1
 */

/**
 * @swagger
 * /inspection-templates/{location}:
 *   get:
 *     summary: 특정 위치의 점검 템플릿 조회
 *     description: 특정 설비/장소에 대한 점검 템플릿을 조회
 *     tags:
 *       - 설비 점검 (Inspection)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *         description: 점검 위치
 *         example: "A동3층전기실"
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
 *                   $ref: '#/components/schemas/InspectionTemplate'
 */

/**
 * @swagger
 * /inspection-records:
 *   get:
 *     summary: 점검 기록 조회
 *     description: 설비별, 기간별, 담당자별 점검 이력을 조회
 *     tags:
 *       - 설비 점검 (Inspection)
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
 *           default: 20
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *       - in: query
 *         name: inspector
 *         schema:
 *           type: string
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
 *         name: status
 *         schema:
 *           type: string
 *           enum: [completed, incomplete, issue_found]
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
 *                     records:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/InspectionRecord'
 *                     totalCount:
 *                       type: integer
 *                       example: 80
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 4
 *   post:
 *     summary: 점검 기록 생성
 *     description: 점검 체크리스트 기반으로 새로운 점검 기록을 생성
 *     tags:
 *       - 설비 점검 (Inspection)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visitRequestId:
 *                 type: integer
 *                 example: 1
 *               templateId:
 *                 type: integer
 *                 example: 1
 *               location:
 *                 type: string
 *                 example: "A동 3층 전기실"
 *               inspectionData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemId:
 *                       type: integer
 *                       example: 1
 *                     itemName:
 *                       type: string
 *                       example: "메인 분전반 상태 확인"
 *                     value:
 *                       type: string
 *                       example: "정상"
 *                     notes:
 *                       type: string
 *                       example: "모든 표시등 정상 작동 확인"
 *                     photoIds:
 *                       type: array
 *                       items:
 *                         type: integer
 *                       example: [1, 2]
 *               overallStatus:
 *                 type: string
 *                 enum: [completed, incomplete, issue_found]
 *                 example: "completed"
 *               generalNotes:
 *                 type: string
 *                 example: "전반적으로 양호한 상태"
 *             required: [templateId, location, inspectionData, overallStatus]
 *     responses:
 *       '201':
 *         description: 기록 생성 성공
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
 *                   example: "점검 기록이 저장되었습니다."
 *                 data:
 *                   type: object
 *                   properties:
 *                     recordId:
 *                       type: integer
 *                       example: 1
 *                     status:
 *                       type: string
 *                       example: "completed"
 */

/**
 * @swagger
 * /inspection-records/{id}:
 *   get:
 *     summary: 점검 기록 상세 조회
 *     description: 특정 점검 기록의 상세 내용을 조회
 *     tags:
 *       - 설비 점검 (Inspection)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 점검 기록 ID
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
 *                   $ref: '#/components/schemas/InspectionRecord'
 */

/**
 * @swagger
 * /inspection-photos:
 *   post:
 *     summary: 점검 사진 업로드
 *     description: 점검 과정에서 촬영한 사진을 업로드
 *     tags:
 *       - 설비 점검 (Inspection)
 *       - 파일 업로드 (File Upload)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 이미지 파일
 *               description:
 *                 type: string
 *                 example: "분전반 상태 사진"
 *               location:
 *                 type: string
 *                 example: "A동 3층 전기실"
 *             required: [photo]
 *     responses:
 *       '201':
 *         description: 업로드 성공
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
 *                   example: "사진이 업로드되었습니다."
 *                 data:
 *                   type: object
 *                   properties:
 *                     photoId:
 *                       type: integer
 *                       example: 1
 *                     photoUrl:
 *                       type: string
 *                       example: "https://storage.example.com/photos/inspection_001.jpg"
 *                     thumbnailUrl:
 *                       type: string
 *                       example: "https://storage.example.com/photos/thumbs/inspection_001.jpg"
 */

/**
 * @swagger
 * /inspection-access:
 *   get:
 *     summary: 점검 권한 조회
 *     description: 현재 사용자의 점검 권한 목록을 조회
 *     tags:
 *       - 설비 점검 (Inspection)
 *       - 권한 관리 (Access Control)
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       location:
 *                         type: string
 *                         example: "A동 3층 전기실"
 *                       category:
 *                         type: string
 *                         example: "전기설비"
 *                       accessLevel:
 *                         type: string
 *                         enum: [read, write, admin]
 *                         example: "write"
 *                       grantedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T00:00:00Z"
 *   post:
 *     summary: 점검 권한 부여
 *     description: 관리자가 사용자에게 특정 설비 점검 권한을 부여
 *     tags:
 *       - 설비 점검 (Inspection)
 *       - 권한 관리 (Access Control)
 *       - 관리자 기능 (Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               location:
 *                 type: string
 *                 example: "A동 3층 전기실"
 *               category:
 *                 type: string
 *                 example: "전기설비"
 *               accessLevel:
 *                 type: string
 *                 enum: [read, write, admin]
 *                 example: "write"
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-31T23:59:59Z"
 *             required: [userId, location, accessLevel]
 *     responses:
 *       '201':
 *         description: 권한 부여 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */

/**
 * @swagger
 * /inspection-access/{location}:
 *   get:
 *     summary: 특정 설비 점검 권한 확인
 *     description: 사용자가 특정 설비 점검 가능 여부를 확인
 *     tags:
 *       - 설비 점검 (Inspection)
 *       - 권한 관리 (Access Control)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *         description: 점검 위치
 *         example: "A동3층전기실"
 *     responses:
 *       '200':
 *         description: 권한 확인 성공
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
 *                     hasAccess:
 *                       type: boolean
 *                       example: true
 *                     accessLevel:
 *                       type: string
 *                       enum: [read, write, admin]
 *                       example: "write"
 *                     location:
 *                       type: string
 *                       example: "A동 3층 전기실"
 *                     category:
 *                       type: string
 *                       example: "전기설비"
 */