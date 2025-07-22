/**
 * @swagger
 * /inspection-forms:
 *   get:
 *     summary: 점검 폼 목록 조회
 *     description: 사용 가능한 점검 폼 목록을 조회합니다.
 *     tags:
 *       - Inspection Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: user_id
 *         in: query
 *         schema:
 *           type: integer
 *         description: 작성자 ID로 필터링
 *       - name: is_editable
 *         in: query
 *         schema:
 *           type: boolean
 *         description: 편집 가능 여부로 필터링
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: 폼 이름으로 검색
 *     responses:
 *       '200':
 *         description: 점검 폼 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InspectionForm'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *   
 *   post:
 *     summary: 점검 폼 생성
 *     description: 새로운 점검 폼을 생성합니다.
 *     tags:
 *       - Inspection Forms
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
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 50
 *                 example: "보안 점검 폼"
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: "정기 보안 점검을 위한 체크리스트"
 *     responses:
 *       '201':
 *         description: 점검 폼 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InspectionForm'

/**
 * @swagger
 * /inspection-forms/{id}:
 *   get:
 *     summary: 점검 폼 상세 조회
 *     description: 특정 점검 폼의 상세 정보를 조회합니다 (필드 포함).
 *     tags:
 *       - Inspection Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '200':
 *         description: 점검 폼 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/InspectionForm'
 *                 - type: object
 *                   properties:
 *                     fields:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/InspectionFormField'
 *   
 *   put:
 *     summary: 점검 폼 수정
 *     description: 기존 점검 폼을 수정합니다.
 *     tags:
 *       - Inspection Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 50
 *               description:
 *                 type: string
 *                 maxLength: 500
 *               is_editable:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: 점검 폼 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InspectionForm'
 *   
 *   delete:
 *     summary: 점검 폼 삭제
 *     description: 점검 폼을 삭제합니다.
 *     tags:
 *       - Inspection Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '204':
 *         description: 점검 폼 삭제 성공

/**
 * @swagger
 * /inspection-forms/{id}/fields:
 *   post:
 *     summary: 점검 폼 필드 추가
 *     description: 점검 폼에 새로운 필드를 추가합니다.
 *     tags:
 *       - Inspection Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label
 *               - question_type
 *             properties:
 *               label:
 *                 type: string
 *                 maxLength: 200
 *                 example: "출입문 잠금 상태를 확인하셨습니까?"
 *               question_type:
 *                 type: string
 *                 enum: [short_answer, paragraph, multiple_choice, checkbox, dropdown, file_upload, linear_scale, mc_grid, cb_grid, date, time]
 *                 example: "multiple_choice"
 *               is_required:
 *                 type: boolean
 *                 default: false
 *                 example: true
 *               sort_order:
 *                 type: integer
 *                 default: 0
 *                 example: 1
 *               settings:
 *                 type: object
 *                 nullable: true
 *                 example: {"min": 1, "max": 5, "step": 1}
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - option_label
 *                   properties:
 *                     option_label:
 *                       type: string
 *                       maxLength: 200
 *                       example: "예"
 *                     option_value:
 *                       type: string
 *                       maxLength: 200
 *                       example: "yes"
 *                     sort_order:
 *                       type: integer
 *                       default: 0
 *                       example: 1
 *     responses:
 *       '201':
 *         description: 필드 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InspectionFormField'

/**
 * @swagger
 * /inspection-form-fields/{id}:
 *   put:
 *     summary: 점검 폼 필드 수정
 *     description: 기존 점검 폼 필드를 수정합니다.
 *     tags:
 *       - Inspection Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *                 maxLength: 200
 *               question_type:
 *                 type: string
 *                 enum: [short_answer, paragraph, multiple_choice, checkbox, dropdown, file_upload, linear_scale, mc_grid, cb_grid, date, time]
 *               is_required:
 *                 type: boolean
 *               sort_order:
 *                 type: integer
 *               settings:
 *                 type: object
 *                 nullable: true
 *     responses:
 *       '200':
 *         description: 필드 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InspectionFormField'
 *   
 *   delete:
 *     summary: 점검 폼 필드 삭제
 *     description: 점검 폼 필드를 삭제합니다.
 *     tags:
 *       - Inspection Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '204':
 *         description: 필드 삭제 성공

/**
 * @swagger
 * /inspection-forms/templates:
 *   get:
 *     summary: 점검 폼 템플릿 목록
 *     description: 시스템에서 제공하는 점검 폼 템플릿 목록을 조회합니다.
 *     tags:
 *       - Inspection Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: category
 *         in: query
 *         schema:
 *           type: string
 *         description: 카테고리로 필터링
 *         example: "전기설비"
 *     responses:
 *       '200':
 *         description: 템플릿 목록 조회 성공
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
 *                       name:
 *                         type: string
 *                         example: "전기설비 점검 템플릿"
 *                       description:
 *                         type: string
 *                         example: "일반적인 전기설비 점검 항목"
 *                       category:
 *                         type: string
 *                         example: "전기설비"
 *                       field_count:
 *                         type: integer
 *                         example: 10

/**
 * @swagger
 * /inspection-forms/templates/{id}/apply:
 *   post:
 *     summary: 템플릿으로 폼 생성
 *     description: 기존 템플릿을 사용하여 새로운 점검 폼을 생성합니다.
 *     tags:
 *       - Inspection Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: 템플릿 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "A동 전기설비 월간점검"
 *               description:
 *                 type: string
 *                 example: "A동 전기설비 월간 정기점검 폼"
 *     responses:
 *       '201':
 *         description: 템플릿으로 폼 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InspectionForm'

/**
 * @swagger
 * /inspection-forms/{id}/duplicate:
 *   post:
 *     summary: 점검 폼 복제
 *     description: 기존 점검 폼을 복제하여 새로운 폼을 생성합니다.
 *     tags:
 *       - Inspection Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "보안 점검 폼 (복사본)"
 *               description:
 *                 type: string
 *                 example: "기존 보안 점검 폼의 복사본"
 *     responses:
 *       '201':
 *         description: 폼 복제 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InspectionForm'

/**
 * @swagger
 * /inspection-forms/me:
 *   get:
 *     summary: 내가 만든 점검 폼 목록
 *     description: 현재 로그인한 사용자가 만든 점검 폼 목록을 조회합니다.
 *     tags:
 *       - Inspection Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: is_editable
 *         in: query
 *         schema:
 *           type: boolean
 *         description: 편집 가능 여부로 필터링
 *     responses:
 *       '200':
 *         description: 내가 만든 점검 폼 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InspectionForm'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */