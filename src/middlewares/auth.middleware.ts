const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
  // Get token from header, the client should be responsible for sending the token
  const token =
    req.header("Authorization").split(" ")[1] ||
    req.header("authorization").split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, "mySecret"); // Verify token
    req.userId = decoded.userId; // Add userId to request object
    next(); // Call next middleware
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { verifyToken };
