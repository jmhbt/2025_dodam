/**
 * @swagger
 * /form-responses:
 *   get:
 *     summary: 폼 응답 목록 조회
 *     description: 점검 폼에 대한 응답 목록을 조회합니다.
 *     tags:
 *       - Form Responses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: form_id
 *         in: query
 *         schema:
 *           type: integer
 *         description: 폼 ID로 필터링
 *       - name: user_id
 *         in: query
 *         schema:
 *           type: integer
 *         description: 응답자 ID로 필터링
 *       - name: date_from
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *         description: 시작 날짜
 *       - name: date_to
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *         description: 종료 날짜
 *     responses:
 *       '200':
 *         description: 폼 응답 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FormResponse'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *   
 *   post:
 *     summary: 폼 응답 제출
 *     description: 점검 폼에 대한 응답을 제출합니다.
 *     tags:
 *       - Form Responses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormResponseCreate'
 *     responses:
 *       '201':
 *         description: 폼 응답 제출 성공
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
 *                   example: "폼 응답이 제출되었습니다."
 *                 data:
 *                   $ref: '#/components/schemas/FormResponse'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'

/**
 * @swagger
 * /form-responses/{id}:
 *   get:
 *     summary: 폼 응답 상세 조회
 *     description: 특정 폼 응답의 상세 정보를 조회합니다 (답변 포함).
 *     tags:
 *       - Form Responses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '200':
 *         description: 폼 응답 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/FormResponse'
 *                 - type: object
 *                   properties:
 *                     answers:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/FieldAnswer'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *   
 *   put:
 *     summary: 폼 응답 수정
 *     description: 기존 폼 응답을 수정합니다.
 *     tags:
 *       - Form Responses
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
 *               - answers
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - field_id
 *                   properties:
 *                     field_id:
 *                       type: integer
 *                       description: 답변할 필드 ID
 *                       example: 1
 *                     option_id:
 *                       type: integer
 *                       nullable: true
 *                       description: 선택형 질문의 선택된 옵션 ID
 *                       example: 1
 *                     answer_text:
 *                       type: string
 *                       nullable: true
 *                       description: 주관식 답변 텍스트
 *                       example: "수정된 답변입니다."
 *     responses:
 *       '200':
 *         description: 폼 응답 수정 성공
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
 *                   example: "폼 응답이 수정되었습니다."
 *                 data:
 *                   $ref: '#/components/schemas/FormResponse'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *   
 *   delete:
 *     summary: 폼 응답 삭제
 *     description: 폼 응답을 삭제합니다.
 *     tags:
 *       - Form Responses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '204':
 *         description: 폼 응답 삭제 성공
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'

/**
 * @swagger
 * /form-responses/me:
 *   get:
 *     summary: 내 폼 응답 목록
 *     description: 현재 로그인한 사용자가 제출한 폼 응답 목록을 조회합니다.
 *     tags:
 *       - Form Responses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: form_id
 *         in: query
 *         schema:
 *           type: integer
 *         description: 폼 ID로 필터링
 *     responses:
 *       '200':
 *         description: 내 폼 응답 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FormResponse'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'

/**
 * @swagger
 * /form-responses/form/{form_id}:
 *   get:
 *     summary: 특정 폼의 응답 목록
 *     description: 특정 점검 폼에 대한 모든 응답을 조회합니다.
 *     tags:
 *       - Form Responses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: form_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 폼 ID
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: include_answers
 *         in: query
 *         schema:
 *           type: boolean
 *           default: false
 *         description: 답변 내용 포함 여부
 *     responses:
 *       '200':
 *         description: 특정 폼의 응답 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 form:
 *                   $ref: '#/components/schemas/InspectionForm'
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FormResponse'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 summary:
 *                   type: object
 *                   properties:
 *                     total_responses:
 *                       type: integer
 *                       example: 25
 *                     unique_responders:
 *                       type: integer
 *                       example: 15
 *                     latest_response:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T14:30:00Z"
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'

/**
 * @swagger
 * /form-responses/stats/{form_id}:
 *   get:
 *     summary: 폼 응답 통계
 *     description: 특정 폼에 대한 응답 통계를 조회합니다.
 *     tags:
 *       - Form Responses
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: form_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 폼 ID
 *     responses:
 *       '200':
 *         description: 폼 응답 통계 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 form:
 *                   $ref: '#/components/schemas/InspectionForm'
 *                 response_count:
 *                   type: integer
 *                   example: 50
 *                 unique_responders:
 *                   type: integer
 *                   example: 25
 *                 response_rate:
 *                   type: number
 *                   format: float
 *                   example: 83.33
 *                   description: 응답률 (%)
 *                 field_statistics:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field_id:
 *                         type: integer
 *                         example: 1
 *                       field_label:
 *                         type: string
 *                         example: "출입문 잠금 상태를 확인하셨습니까?"
 *                       response_count:
 *                         type: integer
 *                         example: 45
 *                       answer_distribution:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             answer:
 *                               type: string
 *                               example: "예"
 *                             count:
 *                               type: integer
 *                               example: 40
 *                             percentage:
 *                               type: number
 *                               format: float
 *                               example: 88.89
 *                 daily_responses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-01-15"
 *                       count:
 *                         type: integer
 *                         example: 3
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'

/**
 * @swagger
 * /form-responses/export/{form_id}:
 *   get:
 *     summary: 폼 응답 내보내기
 *     description: 특정 폼의 응답을 CSV 또는 Excel 파일로 내보냅니다.
 *     tags:
 *       - Form Responses
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: form_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 폼 ID
 *       - name: format
 *         in: query
 *         schema:
 *           type: string
 *           enum: [csv, excel]
 *           default: excel
 *         description: 파일 형식
 *       - name: date_from
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *         description: 시작 날짜
 *       - name: date_to
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *         description: 종료 날짜
 *     responses:
 *       '200':
 *         description: 폼 응답 내보내기 성공
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 */