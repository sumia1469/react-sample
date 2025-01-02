const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { blacklistToken } = require("../utils/jwt");

// 회원가입
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 이메일 중복 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 저장
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 사용자 확인
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // JWT 토큰 발급
    const token = generateToken(user._id);

    // HttpOnly 쿠키로 토큰 저장
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서는 HTTPS로만 전송
      sameSite: "Strict", // CSRF 방지
      maxAge: 3600000, // 1시간 (밀리초 단위)
    });

    res.status(200).json({
      message: "Logged in successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 로그아웃
exports.logout = async (req, res) => {
  try {
    const token = req.cookies.token; // HttpOnly 쿠키에서 토큰 가져오기
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    blacklistToken(token); // 토큰 블랙리스트에 추가

    // 쿠키 제거
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 인증체크
exports.checkAuth = async (req, res) => {
  try {
    // verifyToken 미들웨어에서 인증이 성공하면 req.user에 사용자 정보가 담깁니다.
    console.log('Request User:', req.user); // 인증된 사용자 정보 확인
    if (req.user) {
      return res.status(200).json({ isAuthenticated: true, user: req.user });
    } else {
      return res.status(401).json({ isAuthenticated: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
