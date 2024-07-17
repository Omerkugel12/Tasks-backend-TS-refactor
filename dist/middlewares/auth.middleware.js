"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    // Get token from header, the client should be responsible for sending the token
    const token = req.header("Authorization").split(" ")[1] ||
        req.header("authorization").split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "Access denied" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "mySecret"); // Verify token
        req.userId = decoded.userId; // Add userId to request object
        next(); // Call next middleware
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: "Invalid token" });
    }
}
module.exports = { verifyToken };
