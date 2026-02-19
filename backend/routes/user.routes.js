import express from 'express';
import { getCurrentUser } from "../controllers/user.controller.js";
import { isauthMiddleware } from "../middleware/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.get("/getCurrentUser", isauthMiddleware, getCurrentUser);
export default userRoutes;