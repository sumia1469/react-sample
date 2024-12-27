const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // 환경 변수 로드
const connectDB = require("./config/db"); // MongoDB 연결 함수
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu"); // 메뉴 라우트

const app = express();

// MongoDB 연결
connectDB();

// 미들웨어
app.use(bodyParser.json());
app.use(cors());

// 라우트
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);

// 전역 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));