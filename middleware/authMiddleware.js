const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded; // 사용자 정보를 req에 추가
    req.token = token;  // 로그아웃 시 사용
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };