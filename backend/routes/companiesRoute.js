const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companiesController');
const authMiddleware = require('../utils/authMiddleware');

// 회사 등록
router.post('/', authMiddleware,companiesController.createCompany);
// 회사 목록 조회
router.get('/', authMiddleware, companiesController.getCompanyList);
// 회사 상세 정보 조회
router.get('/:id', authMiddleware, companiesController.getCompanyById);
// 회사 정보 수정
router.put('/:id', authMiddleware, companiesController.updateCompany);
// 회사 정보 삭제
router.delete('/:id', authMiddleware, companiesController.deleteCompany);
// 회사 가입 신청자 조회
router.get('/:id/join-requests', authMiddleware, companiesController.getJoinRequests);
// 회사 직원 목록 조회
router.get('/:companyId/members', authMiddleware, companiesController.getCompanyMembers);
// 회사 직원 추가 (초대/직접 등록)
router.post('/:companyId/members', authMiddleware, companiesController.addCompanyMember);
// 회사 직원 승인 처리 
router.patch('/:companyId/members/:userId/approve', authMiddleware, companiesController.approveCompanyMember);
// 회사 직원 삭제/탈퇴 
router.delete('/:companyId/members/:userId', authMiddleware, companiesController.removeCompanyMember);

module.exports = router;
