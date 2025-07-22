/**
 * @swagger
 * /images:
 *   post:
 *     summary: 이미지 업로드
 *     description: 파일을 업로드하고 특정 엔티티에 연결합니다.
 *     tags:
 *       - Images
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - imageable_type
 *               - imageable_id
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 이미지 파일
 *               imageable_type:
 *                 type: string
 *                 enum: [user, company, visit_request, inspection]
 *                 description: 이미지가 연결될 엔티티 타입
 *                 example: "user"
 *               imageable_id:
 *                 type: integer
 *                 description: 이미지가 연결될 엔티티 ID
 *                 example: 1
 *               purpose:
 *                 type: string
 *                 description: 이미지 용도
 *                 example: "profile"
 *     responses:
 *       '201':
 *         description: 이미지 업로드 성공
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
 *                   example: "이미지가 성공적으로 업로드되었습니다."
 *                 data:
 *                   $ref: '#/components/schemas/Image'
 *       '400':
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "지원하지 않는 파일 형식입니다."
 *                 code:
 *                   type: string
 *                   example: "INVALID_FILE_TYPE"
 *       '413':
 *         description: 파일 크기 초과
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "파일 크기가 10MB를 초과합니다."
 *                 code:
 *                   type: string
 *                   example: "FILE_TOO_LARGE"

/**
 * @swagger
 * /images/{id}:
 *   get:
 *     summary: 이미지 정보 조회
 *     description: 특정 이미지의 정보를 조회합니다.
 *     tags:
 *       - Images
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 이미지 ID
 *     responses:
 *       '200':
 *         description: 이미지 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Image'
 *       '404':
 *         description: 이미지를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이미지를 찾을 수 없습니다."
 *                 code:
 *                   type: string
 *                   example: "IMAGE_NOT_FOUND"
 *   delete:
 *     summary: 이미지 삭제
 *     description: 시스템에서 이미지를 삭제합니다.
 *     tags:
 *       - Images
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 이미지 ID
 *     responses:
 *       '204':
 *         description: 이미지 삭제 성공
 *       '404':
 *         description: 이미지를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이미지를 찾을 수 없습니다."
 *       '403':
 *         description: 삭제 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이미지를 삭제할 권한이 없습니다."
 *                 code:
 *                   type: string
 *                   example: "INSUFFICIENT_PERMISSIONS"

/**
 * @swagger
 * /images/entity/{type}/{id}:
 *   get:
 *     summary: 엔티티별 이미지 목록 조회
 *     description: 특정 엔티티에 연결된 모든 이미지를 조회합니다.
 *     tags:
 *       - Images
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: type
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [user, company, visit_request, inspection]
 *         description: 엔티티 타입
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 엔티티 ID
 *       - name: purpose
 *         in: query
 *         schema:
 *           type: string
 *         description: 특정 용도로 필터링
 *     responses:
 *       '200':
 *         description: 이미지 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Image'
 *                 total:
 *                   type: integer
 *                   example: 5
 */