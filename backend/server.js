import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Ai Exam Preparation app running✅!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb();
})