const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "your_jwt_secret", { expiresIn: "1h" });
};

module.exports = generateToken;