const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  //console.log('Cookies:', req.cookies); // 쿠키 값 확인
  //console.log('JWT_SECRET:', process.env.JWT_SECRET); // 환경 변수 값 확인
  const token = req.cookies?.token;
  if (!token) {
    console.error('Token is missing.');
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};