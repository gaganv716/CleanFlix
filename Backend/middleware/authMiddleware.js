// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header is present and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    // Attach user info to request object
    req.user = decoded;

    next(); // Move to the next middleware/controller
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
