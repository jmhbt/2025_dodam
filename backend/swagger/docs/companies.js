/**
 * @swagger
 * /companies:
 *   get:
 *     summary: 회사 목록 조회
 *     description: 등록된 회사 목록을 조회
 *     tags:
 *       - 회사 관리 (Companies)
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
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 회사명 검색
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
 *                     companies:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Company'
 *                     totalCount:
 *                       type: integer
 *                       example: 25
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 *   post:
 *     summary: 회사 등록
 *     description: 새로운 회사를 시스템에 등록
 *     tags:
 *       - 회사 관리 (Companies)
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
 *                 example: "ABC 주식회사"
 *               registrationNo:
 *                 type: string
 *                 example: "123-45-67890"
 *               address:
 *                 type: string
 *                 example: "서울시 강남구 테헤란로 123"
 *               phone:
 *                 type: string
 *                 example: "02-1234-5678"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "contact@abc.com"
 *               contactPerson:
 *                 type: string
 *                 example: "김담당자"
 *               contactPhone:
 *                 type: string
 *                 example: "010-1234-5678"
 *               website:
 *                 type: string
 *                 example: "https://www.abc.com"
 *               companyType:
 *                 type: string
 *                 example: "설비점검업체"
 *             required: [name, registrationNo, contactPerson, contactPhone]
 *     responses:
 *       '201':
 *         description: 등록 성공
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
 *                   example: "회사가 등록되었습니다."
 *                 data:
 *                   type: object
 *                   properties:
 *                     companyId:
 *                       type: integer
 *                       example: 1
 */

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: 회사 상세 정보 조회
 *     description: 특정 회사의 상세 정보를 조회
 *     tags:
 *       - 회사 관리 (Companies)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 회사 ID
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
 *                   $ref: '#/components/schemas/Company'
 *   put:
 *     summary: 회사 정보 수정
 *     description: 기존 회사 정보를 수정
 *     tags:
 *       - 회사 관리 (Companies)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
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
 *                 example: "ABC 주식회사"
 *               address:
 *                 type: string
 *                 example: "서울시 강남구 테헤란로 123"
 *               phone:
 *                 type: string
 *                 example: "02-1234-5678"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "contact@abc.com"
 *               contactPerson:
 *                 type: string
 *                 example: "김담당자"
 *               contactPhone:
 *                 type: string
 *                 example: "010-1234-5678"
 *               website:
 *                 type: string
 *                 example: "https://www.abc.com"
 *               companyType:
 *                 type: string
 *                 example: "설비점검업체"
 *     responses:
 *       '200':
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */