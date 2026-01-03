const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
module.exports = function(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const secret = process.env.JWT_SECRET || "your_jwt_secret"; // Make sure to set in Render environment
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // { id, email, iat, exp }
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};
