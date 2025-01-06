const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config(); // 환경 변수 로드
const connectDB = require("./config/db"); // MongoDB 연결 함수
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu"); // 메뉴 라우트
const bmCodeRoutes = require('./routes/bmCode');

const app = express();
// MongoDB 연결
connectDB();

app.use(cors({
    origin: 'http://reacttest.com',
    credentials: true,	// 이 부분이 추가된다
}));
// 미들웨어
app.use(cookieParser());
app.use(bodyParser.json());

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