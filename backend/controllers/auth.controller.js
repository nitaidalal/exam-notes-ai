
import User from "../models/user.model.js";
import { generateToken } from "../utils/token.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const googleAuth = async (req, res) => {
    try {
        const { name, email, profilePic } = req.body;

        if (!name || !email) {
            return res.status(400).json({ 
                success: false, 
                message: "Name and email are required" 
            });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        let isNewUser = false;
        if (!user) {
            isNewUser = true;

            // Create new user
            let cloudinaryUrl = null;
            
            if (profilePic) {
                try {
                    cloudinaryUrl = await uploadToCloudinary(profilePic);
                } catch (uploadError) {
                    console.error('Error uploading profile picture:', uploadError);
                    return res.status(500).json({ 
                        success: false, 
                        message: "Failed to upload profile picture",
                        error: uploadError.message
                    });
                }
            }
            user =  await User.create({
                name,
                email,
                profilePic: cloudinaryUrl || null
            });
        }
        

        // Generate JWT token
        const token = generateToken(user._id);

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            success: true,
            message: isNewUser ? "User created successfully" : "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
                credits: user.credits,
                isCreditAvailable: user.isCreditAvailable
            },
            token
        });

    } catch (error) {
        console.error("Error in googleAuth:", error);
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({   
            success: true,
            message: "Logged out successfully"
        });
    } catch(error){
        console.error("Error in logout:", error);
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}