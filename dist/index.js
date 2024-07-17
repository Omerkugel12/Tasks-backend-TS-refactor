"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
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
    app.use(express_1.default.static("public"));
    app.use(express_1.default.json());
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
