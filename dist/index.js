"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 3000;
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const task_route_1 = __importDefault(require("./routes/task.route"));
const activity_route_1 = __importDefault(require("./routes/activity.route"));
const archive_route_1 = __importDefault(require("./routes/archive.route"));
const connectDB = require("./config/db");
dotenv_1.default.config();
async function main() {
    await connectDB();
    app.use(express_1.default.static("public"));
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    //ROUTES
    app.use("/api/auth", auth_route_1.default);
    app.use("/api/user", auth_middleware_1.verifyToken, user_route_1.default);
    app.use("/api/task", auth_middleware_1.verifyToken, task_route_1.default);
    app.use("/api/activity", auth_middleware_1.verifyToken, activity_route_1.default);
    app.use("/api/archive", auth_middleware_1.verifyToken, archive_route_1.default);
    // Catch-all route
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
    });
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
main();
