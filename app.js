const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

// MongoDB 연결
connectDB();

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 라우터 연결
app.use("/api/auth", authRoutes);

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});