import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}