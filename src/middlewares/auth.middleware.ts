import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/userTypes";

interface DecodedToken {
  userId: string;
}

export function verifyToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  // Get token from header; the client should be responsible for sending the token
  const authHeader = req.header("Authorization") || req.header("authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, "mySecret") as DecodedToken; // Verify token
    req.userId = decoded.userId; // Add userId to request object
    next(); // Call next middleware
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid token" });
  }
}
