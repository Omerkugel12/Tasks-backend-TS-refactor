import express from 'express'
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const dotenv = require("dotenv");
const { verifyToken } = require("./middlewares/auth.middleware");
//drdrf
const connectDB = require("./config/db");

dotenv.config();

async function main() {
  await connectDB();

  app.use(express.static("public"));

  app.use(express.json());

  app.use(cors());

  //ROUTES
  const authRoutes = require("./routes/auth.route");
  const userRoutes = require("./routes/user.route");
  const taskRoutes = require("./routes/task.route");
  const activityRoutes = require("./routes/activity.route");
  const archiveRoutes = require("./routes/archive.route");

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
