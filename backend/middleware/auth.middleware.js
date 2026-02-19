import jwt from 'jsonwebtoken';

export const isauthMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "Unauthorized: No token provided"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ 
            success: false, 
            message: "Unauthorized: Invalid token"
        });
    }
}