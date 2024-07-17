import express, { Application } from "express";
const app: Application = express();
import path from "path";
const PORT = process.env.PORT || 3000;
import cors from "cors";
import dotenv from "dotenv";
import { verifyToken } from "./middlewares/auth.middleware";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import taskRoutes from "./routes/task.route";
import activityRoutes from "./routes/activity.route";
import archiveRoutes from "./routes/archive.route";

const connectDB = require("./config/db");

dotenv.config();

async function main() {
  await connectDB();

  app.use(express.static("public"));

  app.use(express.json());

  app.use(cors());

  //ROUTES

  app.use("/api/auth", authRoutes);
  app.use("/api/user", verifyToken, userRoutes);
  app.use("/api/task", verifyToken, taskRoutes);
  app.use("/api/activity", verifyToken, activityRoutes);
  app.use("/api/archive", verifyToken, archiveRoutes);

  // Catch-all route
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
