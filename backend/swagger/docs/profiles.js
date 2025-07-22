/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: 내 프로필 조회
 *     description: 현재 사용자의 프로필 정보를 조회
 *     tags:
 *       - 프로필 관리 (Profiles)
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
 *                   $ref: '#/components/schemas/Profile'
 *   post:
 *     summary: 프로필 생성
 *     description: 사용자 프로필을 생성
 *     tags:
 *       - 프로필 관리 (Profiles)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyId:
 *                 type: integer
 *                 example: 1
 *               jobTitle:
 *                 type: string
 *                 example: "설비점검원"
 *               department:
 *                 type: string
 *                 example: "기술팀"
 *               responsibilities:
 *                 type: string
 *                 example: "전기설비 점검 및 유지보수"
 *             required: [companyId, jobTitle]
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
 *                   example: "프로필이 생성되었습니다."
 *                 data:
 *                   type: object
 *                   properties:
 *                     profileId:
 *                       type: integer
 *                       example: 1
 *   put:
 *     summary: 프로필 수정
 *     description: 사용자 프로필 정보를 수정
 *     tags:
 *       - 프로필 관리 (Profiles)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobTitle:
 *                 type: string
 *                 example: "수석 설비점검원"
 *               department:
 *                 type: string
 *                 example: "기술팀"
 *               responsibilities:
 *                 type: string
 *                 example: "전기설비 점검 및 유지보수, 신입사원 교육"
 *     responses:
 *       '200':
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */