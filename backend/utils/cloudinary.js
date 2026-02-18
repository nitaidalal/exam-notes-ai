import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const uploadToCloudinary = async (imageUrl, folder = 'profile_pictures') => {
    try {
        const result = await cloudinary.uploader.upload(imageUrl, {
            folder: folder,
            resource_type: 'image',
            transformation: [
                { width: 500, height: 500, crop: 'fill' },
                { quality: 'auto' }
            ]
        });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
};

export default cloudinary;
