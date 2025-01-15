import { v2 as cloudinary } from 'cloudinary';

if (!process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET || 
    !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    throw new Error('Missing Cloudinary environment variables');
}

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;