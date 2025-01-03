const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // 환경 변수 로드
const connectDB = require("./config/db"); // MongoDB 연결 함수
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu"); // 메뉴 라우트
const bmCodeRoutes = require('./routes/bmCode');

const app = express();
// MongoDB 연결
connectDB();

// 미들웨어
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:8081', // 프론트엔드가 호스팅되는 주소
  credentials: true, // 쿠키를 포함한 요청을 허용
}));

// 라우트
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use('/api', bmCodeRoutes);

// 전역 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));