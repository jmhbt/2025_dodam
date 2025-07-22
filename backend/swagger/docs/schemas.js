/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT 토큰을 사용한 인증
 *   
 *   responses:
 *     BadRequest:
 *       description: 잘못된 요청
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     
 *     Unauthorized:
 *       description: 인증 실패
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     
 *     Forbidden:
 *       description: 권한 없음
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     
 *     NotFound:
 *       description: 리소스를 찾을 수 없음
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     
 *     InternalServerError:
 *       description: 서버 오류
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *   
 *   parameters:
 *     IdParam:
 *       name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: integer
 *         minimum: 1
 *       description: 리소스 ID
 *     
 *     PageParam:
 *       name: page
 *       in: query
 *       schema:
 *         type: integer
 *         minimum: 1
 *         default: 1
 *       description: 페이지 번호
 *     
 *     LimitParam:
 *       name: limit
 *       in: query
 *       schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 100
 *         default: 20
 *       description: 페이지당 항목 수
 *   
 *   schemas:
 *     # 공통 스키마
 *     Error:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           description: 오류 메시지
 *           example: "요청을 처리할 수 없습니다."
 *         code:
 *           type: string
 *           description: 오류 코드
 *           example: "VALIDATION_ERROR"
 *         details:
 *           type: object
 *           description: 추가 오류 정보
 *           example: {"field": "email", "issue": "이미 사용중인 이메일입니다."}
 *     
 *     Pagination:
 *       type: object
 *       properties:
 *         current_page:
 *           type: integer
 *           example: 1
 *         per_page:
 *           type: integer
 *           example: 20
 *         total:
 *           type: integer
 *           example: 150
 *         total_pages:
 *           type: integer
 *           example: 8
 *     
 *     # 회사 스키마
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "테크 컴퍼니"
 *         address:
 *           type: string
 *           example: "서울시 강남구 테헤란로 123"
 *         website:
 *           type: string
 *           format: uri
 *           nullable: true
 *           example: "https://example.com"
 *         description:
 *           type: string
 *           example: "혁신적인 기술 회사"
 *         ceo_name:
 *           type: string
 *           example: "김대표"
 *         ceo_phone:
 *           type: string
 *           example: "010-1234-5678"
 *         ceo_email:
 *           type: string
 *           format: email
 *           example: "ceo@example.com"
 *         headcount:
 *           type: integer
 *           example: 50
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00Z"
 *     
 *     # 사용자 스키마
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         name:
 *           type: string
 *           example: "김철수"
 *         phone:
 *           type: string
 *           nullable: true
 *           example: "010-1234-5678"
 *         job_title:
 *           type: string
 *           example: "개발자"
 *         department:
 *           type: string
 *           nullable: true
 *           example: "개발팀"
 *         role:
 *           type: string
 *           nullable: true
 *           example: "팀리더"
 *         system_role:
 *           type: string
 *           nullable: true
 *           example: "admin"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "백엔드 개발 담당"
 *         is_accepted:
 *           type: boolean
 *           example: true
 *         company_id:
 *           type: integer
 *           nullable: true
 *           example: 1
 *         company:
 *           $ref: '#/components/schemas/Company'
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00Z"
 *     
 *     # 방문 요청 스키마
 *     VisitRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "시설 점검 방문"
 *         location:
 *           type: string
 *           example: "1층 로비"
 *         product:
 *           type: string
 *           example: "보안 시스템"
 *         context:
 *           type: string
 *           example: "정기 보안 점검을 위한 방문입니다."
 *         is_editable:
 *           type: boolean
 *           example: true
 *         company_id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 1
 *         forms_id:
 *           type: integer
 *           example: 1
 *         company:
 *           $ref: '#/components/schemas/Company'
 *         user:
 *           $ref: '#/components/schemas/User'
 *         inspection_form:
 *           $ref: '#/components/schemas/InspectionForm'
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00Z"
 *     
 *     # 방문 응답 스키마
 *     VisitResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "방문 승인 요청"
 *         context:
 *           type: string
 *           example: "업무 목적 방문"
 *         vehicle_type:
 *           type: string
 *           nullable: true
 *           example: "승용차"
 *         vehicle_no:
 *           type: string
 *           nullable: true
 *           example: "12가3456"
 *         start_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T09:00:00Z"
 *         end_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T17:00:00Z"
 *         is_editable:
 *           type: boolean
 *           example: true
 *         is_accepted:
 *           type: boolean
 *           example: false
 *         reason:
 *           type: string
 *           nullable: true
 *           example: "승인 대기 중"
 *         user_id:
 *           type: integer
 *           example: 1
 *         request_id:
 *           type: integer
 *           example: 1
 *         user:
 *           $ref: '#/components/schemas/User'
 *         visit_request:
 *           $ref: '#/components/schemas/VisitRequest'
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00Z"
 *     
 *     # 방문 로그 스키마
 *     VisitLog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         type:
 *           type: string
 *           enum: [entry, exit]
 *           example: "entry"
 *         user_id:
 *           type: integer
 *           example: 1
 *         response_id:
 *           type: integer
 *           example: 1
 *         user:
 *           $ref: '#/components/schemas/User'
 *         visit_response:
 *           $ref: '#/components/schemas/VisitResponse'
 *         issued_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T09:00:00Z"
 *     
 *     # 점검 폼 스키마
 *     InspectionForm:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "보안 점검 폼"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "정기 보안 점검을 위한 체크리스트"
 *         is_editable:
 *           type: boolean
 *           example: true
 *         user_id:
 *           type: integer
 *           example: 1
 *         user:
 *           $ref: '#/components/schemas/User'
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00Z"
 *     
 *     # 점검 폼 필드 스키마
 *     InspectionFormField:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         form_id:
 *           type: integer
 *           example: 1
 *         label:
 *           type: string
 *           example: "출입문 잠금 상태를 확인하셨습니까?"
 *         question_type:
 *           type: string
 *           enum: [short_answer, paragraph, multiple_choice, checkbox, dropdown, file_upload, linear_scale, mc_grid, cb_grid, date, time]
 *           example: "multiple_choice"
 *         is_required:
 *           type: boolean
 *           example: true
 *         sort_order:
 *           type: integer
 *           example: 1
 *         settings:
 *           type: object
 *           nullable: true
 *           description: 질문 유형별 추가 설정
 *           example: {"min": 1, "max": 5, "step": 1}
 *         options:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/InspectionFormFieldOption'
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00Z"
 *     
 *     # 점검 폼 필드 옵션 스키마
 *     InspectionFormFieldOption:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         field_id:
 *           type: integer
 *           example: 1
 *         option_label:
 *           type: string
 *           example: "예"
 *         option_value:
 *           type: string
 *           nullable: true
 *           example: "yes"
 *         sort_order:
 *           type: integer
 *           example: 1
 *     
 *     # 폼 응답 스키마
 *     FormResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         form_id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 1
 *         form:
 *           $ref: '#/components/schemas/InspectionForm'
 *         user:
 *           $ref: '#/components/schemas/User'
 *         submitted_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T14:30:00Z"
 *     
 *     # 필드 답변 스키마
 *     FieldAnswer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         response_id:
 *           type: integer
 *           example: 1
 *         field_id:
 *           type: integer
 *           example: 1
 *         option_id:
 *           type: integer
 *           nullable: true
 *           example: 1
 *         answer_text:
 *           type: string
 *           nullable: true
 *           example: "모든 출입문이 정상적으로 잠겨있습니다."
 *         field:
 *           $ref: '#/components/schemas/InspectionFormField'
 *         option:
 *           $ref: '#/components/schemas/InspectionFormFieldOption'
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T14:30:00Z"
 *     
 *     # 이미지 스키마
 *     Image:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         url:
 *           type: string
 *           format: uri
 *           example: "https://example.com/images/profile.jpg"
 *         imageable_id:
 *           type: integer
 *           example: 1
 *         imageable_type:
 *           type: string
 *           enum: [user, company, visit_request, inspection]
 *           example: "user"
 *         purpose:
 *           type: string
 *           nullable: true
 *           example: "profile"
 *         metadata:
 *           type: object
 *           nullable: true
 *           description: 이미지 메타데이터
 *           example: {"width": 800, "height": 600, "format": "jpeg", "size": 204800}
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T14:30:00Z"
 */