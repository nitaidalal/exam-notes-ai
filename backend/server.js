import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./utils/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Ai Exam Preparation app running✅!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb();
})