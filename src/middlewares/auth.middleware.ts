import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface decodedToken {
  userId: string;
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
  // Get token from header, the client should be responsible for sending the token
  const token =
    req.header("Authorization").split(" ")[1] ||
    req.header("authorization").split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, "mySecret") as decodedToken; // Verify token
    req.userId = decoded.userId; // Add userId to request object
    next(); // Call next middleware
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { verifyToken };
