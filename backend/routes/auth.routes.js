import express from 'express';
import { googleAuth, logout } from '../controllers/auth.controller.js';

const router = express.Router();

// Google OAuth route
router.post('/google', googleAuth);
router.get('/logout', logout);

export default router;
