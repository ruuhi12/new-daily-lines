const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const secret = "aStrongSecret123!@#"; // same as login
    const decoded = jwt.verify(token, secret);

    // ✅ MAP PROPERLY
    req.user = {
      id: decoded.userId
    };

    next();
  } catch (err) {
    console.error("JWT ERROR:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};
