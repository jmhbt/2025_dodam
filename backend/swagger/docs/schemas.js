/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "오류가 발생했습니다."
 *         error:
 *           type: string
 *           example: "VALIDATION_ERROR"
 *       required: [success, message]
 *     
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "처리가 완료되었습니다."
 *       required: [success, message]
 *     
 *     User:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "홍길동"
 *         email:
 *           type: string
 *           example: "hong@example.com"
 *         phone:
 *           type: string
 *           example: "010-1234-5678"
 *         role:
 *           type: string
 *           enum: [visitor, admin]
 *           example: "visitor"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00Z"
 *       required: [userId, name, email, phone, role]
 *     
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "ABC 주식회사"
 *         registrationNo:
 *           type: string
 *           example: "123-45-67890"
 *         address:
 *           type: string
 *           example: "서울시 강남구 테헤란로 123"
 *         phone:
 *           type: string
 *           example: "02-1234-5678"
 *         email:
 *           type: string
 *           example: "contact@abc.com"
 *         contactPerson:
 *           type: string
 *           example: "김담당자"
 *         contactPhone:
 *           type: string
 *           example: "010-1234-5678"
 *         website:
 *           type: string
 *           example: "https://www.abc.com"
 *         companyType:
 *           type: string
 *           example: "설비점검업체"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00Z"
 *       required: [id, name, registrationNo, contactPerson, contactPhone]
 *     
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 1
 *         companyId:
 *           type: integer
 *           example: 1
 *         jobTitle:
 *           type: string
 *           example: "설비점검원"
 *         department:
 *           type: string
 *           example: "기술팀"
 *         role:
 *           type: string
 *           example: "inspector"
 *         responsibilities:
 *           type: string
 *           example: "전기설비 점검 및 유지보수"
 *         company:
 *           $ref: '#/components/schemas/Company'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00Z"
 *       required: [id, userId, companyId, jobTitle]
 *     
 *     VisitRequest:
 *       type: object
 *       properties:
 *         visitId:
 *           type: integer
 *           example: 1
 *         profileId:
 *           type: integer
 *           example: 1
 *         companyId:
 *           type: integer
 *           example: 1
 *         purpose:
 *           type: string
 *           example: "설비 점검"
 *         location:
 *           type: string
 *           example: "A동 3층 전기실"
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2024-01-15"
 *         startTime:
 *           type: string
 *           example: "09:00"
 *         endDate:
 *           type: string
 *           format: date
 *           example: "2024-01-15"
 *         endTime:
 *           type: string
 *           example: "17:00"
 *         vehicleNo:
 *           type: string
 *           example: "12가3456"
 *         contactPhone:
 *           type: string
 *           example: "010-1234-5678"
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected, cancelled]
 *           example: "pending"
 *         requestedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-10T10:30:00Z"
 *         reviewedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-11T14:20:00Z"
 *       required: [visitId, profileId, companyId, purpose, location, startDate, startTime, endDate, endTime, status, requestedAt]
 *     
 *     VisitRequestAdmin:
 *       allOf:
 *         - $ref: '#/components/schemas/VisitRequest'
 *         - type: object
 *           properties:
 *             visitor:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "홍길동"
 *                 phone:
 *                   type: string
 *                   example: "010-1234-5678"
 *                 email:
 *                   type: string
 *                   example: "hong@example.com"
 *             company:
 *               $ref: '#/components/schemas/Company'
 *             feedback:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [approval, rejection, comment]
 *                     example: "approval"
 *                   comment:
 *                     type: string
 *                     example: "승인되었습니다."
 *                   reviewerId:
 *                     type: integer
 *                     example: 2
 *                   reviewerName:
 *                     type: string
 *                     example: "관리자"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-11T14:20:00Z"
 *     
 *     VisitLog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         requestId:
 *           type: integer
 *           example: 1
 *         type:
 *           type: string
 *           enum: [entry, exit]
 *           example: "entry"
 *         scannedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T09:00:00Z"
 *         deviceId:
 *           type: string
 *           example: "GATE_001"
 *         location:
 *           type: string
 *           example: "A동 출입구"
 *         visitor:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "홍길동"
 *             company:
 *               type: string
 *               example: "ABC 회사"
 *             phone:
 *               type: string
 *               example: "010-1234-5678"
 *       required: [id, requestId, type, scannedAt]
 *     
 *     InspectionTemplate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "전기 설비 점검 템플릿"
 *         description:
 *           type: string
 *           example: "A동 전기실 일반 점검 항목"
 *         location:
 *           type: string
 *           example: "A동 3층 전기실"
 *         category:
 *           type: string
 *           example: "전기설비"
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "메인 분전반 상태 확인"
 *               description:
 *                 type: string
 *                 example: "분전반 표시등 정상 작동 여부 확인"
 *               type:
 *                 type: string
 *                 enum: [checkbox, text, number, photo]
 *                 example: "checkbox"
 *               required:
 *                 type: boolean
 *                 example: true
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["정상", "이상", "점검 필요"]
 *               order:
 *                 type: integer
 *                 example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00Z"
 *       required: [id, name, location, category, items]
 *     
 *     InspectionRecord:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         visitRequestId:
 *           type: integer
 *           example: 1
 *         templateId:
 *           type: integer
 *           example: 1
 *         profileId:
 *           type: integer
 *           example: 1
 *         location:
 *           type: string
 *           example: "A동 3층 전기실"
 *         inspectionData:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: integer
 *                 example: 1
 *               itemName:
 *                 type: string
 *                 example: "메인 분전반 상태 확인"
 *               value:
 *                 type: string
 *                 example: "정상"
 *               notes:
 *                 type: string
 *                 example: "모든 표시등 정상 작동 확인"
 *               photos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     url:
 *                       type: string
 *                       example: "https://storage.example.com/photos/inspection_001.jpg"
 *                     thumbnailUrl:
 *                       type: string
 *                       example: "https://storage.example.com/photos/thumbs/inspection_001.jpg"
 *                     description:
 *                       type: string
 *                       example: "분전반 상태 사진"
 *         overallStatus:
 *           type: string
 *           enum: [completed, incomplete, issue_found]
 *           example: "completed"
 *         generalNotes:
 *           type: string
 *           example: "전반적으로 양호한 상태"
 *         checkedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T14:30:00Z"
 *         inspector:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "홍길동"
 *             company:
 *               type: string
 *               example: "ABC 회사"
 *             jobTitle:
 *               type: string
 *               example: "설비점검원"
 *         template:
 *           $ref: '#/components/schemas/InspectionTemplate'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T14:30:00Z"
 *       required: [id, templateId, profileId, location, inspectionData, overallStatus, checkedAt]
 *   
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT 토큰을 사용한 인증
 */