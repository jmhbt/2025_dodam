// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 회원가입
router.post('/register', authController.register);

// 이메일 인증 코드 발송
router.post('/send-email-verify', authController.SendEmailVerify);

// 이메일 코드 검증
router.post('/email-verify', authController.emailVerify);

// 로그인
router.post('/login', authController.login);

// 액세스 토큰 재발급
router.post('/refresh', authController.refresh);

// 로그아웃
router.post('/logout', authController.logout);

router.get('/auth/google/callback', authController.googleCallback);

router.get('/auth/google', authController.getGoogleAuthUrl);

module.exports = router;
