const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  console.log("AUTH HEADER:", authHeader);
  console.log("TOKEN:", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const secret = "aStrongSecret123!@#";
    const decoded = jwt.verify(token, secret);

    console.log("DECODED TOKEN:", decoded);

    // ✅ FORCE MAP
    req.user = {
      id: decoded.userId
    };

    console.log("REQ.USER SET TO:", req.user);

    next();
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
