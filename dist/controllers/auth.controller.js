"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SALT_ROUNDS = 10;
async function register(req, res) {
    try {
        const { username, password, ...rest } = req.body;
        const existingUser = await user_model_1.default.findOne({ username }); // Use findOne to check if the user exists
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, SALT_ROUNDS); // Hash password
        const user = new user_model_1.default({
            username,
            password: hashedPassword,
            ...rest,
        }); // Create new user object
        await user.save(); // Save user to database
        // Generate JWT token containing user id
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, "mySecret", {
            expiresIn: "1h",
        });
        // Send token in response to the client
        res.status(201).json({ message: "User registered successfully", token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Registration failed" });
    }
}
async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await user_model_1.default.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        const isPasswordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        // console.log(password, user.password);
        // Generate JWT token containing user id
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, "mySecret", {
            expiresIn: "1h",
        });
        // Send token in response to the client, not the user object!
        res.status(200).json({ token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Login failed" });
    }
}
