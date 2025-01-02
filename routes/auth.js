const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

// 회원가입
router.post("/register", authController.register);

// 로그인
router.post("/login", authController.login);

// 로그아웃
router.post("/logout", verifyToken, authController.logout);

// 로그인 인증
router.get('/checkAuth', verifyToken, authController.checkAuth);

module.exports = router;