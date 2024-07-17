import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export async function register(req: Request, res: Response) {
  try {
    const { username, password, ...rest } = req.body;

    const existingUser = await User.findOne({ username }); // Use findOne to check if the user exists
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); // Hash password
    const user = new User({
      username,
      password: hashedPassword,
      ...rest,
    }); // Create new user object
    await user.save(); // Save user to database

    // Generate JWT token containing user id
    const token = jwt.sign({ userId: user._id }, "mySecret", {
      expiresIn: "1h",
    });

    // Send token in response to the client
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    // console.log(password, user.password);

    // Generate JWT token containing user id
    const token = jwt.sign({ userId: user._id }, "mySecret", {
      expiresIn: "1h",
    });

    // Send token in response to the client, not the user object!
    res.status(200).json({ token });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
}
