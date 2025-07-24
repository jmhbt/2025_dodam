/**
 * @swagger
 * /companies:
 *   get:
 *     summary: 회사 목록 조회
 *     description: 등록된 회사 목록을 조회합니다.
 *     tags:
 *       - Companies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: 페이지당 항목 수
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 회사명으로 검색
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
 *                     $ref: '#/components/schemas/Company'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     current_page:
 *                       type: integer
 *                       example: 1
 *                     per_page:
 *                       type: integer
 *                       example: 20
 *                     total:
 *                       type: integer
 *                       example: 150
 *                     total_pages:
 *                       type: integer
 *                       example: 8
 *   post:
 *     summary: 회사 등록
 *     description: 새로운 회사를 시스템에 등록합니다.
 *     tags:
 *       - Companies
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - description
 *               - ceo_name
 *               - ceo_phone
 *               - ceo_email
 *               - headcount
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 example: "테크 컴퍼니"
 *               address:
 *                 type: string
 *                 maxLength: 500
 *                 example: "서울시 강남구 테헤란로 123"
 *               website:
 *                 type: string
 *                 format: uri
 *                 maxLength: 2048
 *                 example: "https://example.com"
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: "혁신적인 기술 회사"
 *               ceo_name:
 *                 type: string
 *                 maxLength: 100
 *                 example: "김대표"
 *               ceo_phone:
 *                 type: string
 *                 maxLength: 20
 *                 example: "010-1234-5678"
 *               ceo_email:
 *                 type: string
 *                 format: email
 *                 maxLength: 100
 *                 example: "ceo@example.com"
 *               headcount:
 *                 type: integer
 *                 minimum: 1
 *                 example: 50
 *     responses:
 *       '201':
 *         description: 회사 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       '400':
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회사명은 필수 항목입니다."
 *                 code:
 *                   type: string
 *                   example: "VALIDATION_ERROR"

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: 회사 상세 조회
 *     description: 특정 회사의 상세 정보를 조회합니다.
 *     tags:
 *       - Companies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 회사 ID
 *     responses:
 *       '200':
 *         description: 회사 상세 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       '404':
 *         description: 회사를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회사를 찾을 수 없습니다."
 *                 code:
 *                   type: string
 *                   example: "COMPANY_NOT_FOUND"
 *   put:
 *     summary: 회사 정보 수정
 *     description: 기존 회사 정보를 수정합니다.
 *     tags:
 *       - Companies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 회사 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 example: "테크 컴퍼니"
 *               address:
 *                 type: string
 *                 maxLength: 500
 *                 example: "서울시 강남구 테헤란로 123"
 *               website:
 *                 type: string
 *                 format: uri
 *                 maxLength: 2048
 *                 example: "https://example.com"
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: "혁신적인 기술 회사"
 *               ceo_name:
 *                 type: string
 *                 maxLength: 100
 *                 example: "김대표"
 *               ceo_phone:
 *                 type: string
 *                 maxLength: 20
 *                 example: "010-1234-5678"
 *               ceo_email:
 *                 type: string
 *                 format: email
 *                 maxLength: 100
 *                 example: "ceo@example.com"
 *               headcount:
 *                 type: integer
 *                 minimum: 1
 *                 example: 50
 *     responses:
 *       '200':
 *         description: 회사 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       '404':
 *         description: 회사를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회사를 찾을 수 없습니다."
 *   delete:
 *     summary: 회사 삭제
 *     description: 회사를 시스템에서 삭제합니다.
 *     tags:
 *       - Companies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 회사 ID
 *     responses:
 *       '204':
 *         description: 회사 삭제 성공
 *       '404':
 *         description: 회사를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회사를 찾을 수 없습니다."
 */