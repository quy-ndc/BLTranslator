const cloudinaryEndpoint = process.env.EXPO_PUBLIC_CLOUDINARY_END_POINT
const cloudinaryCloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME
const cloudinaryCloudKey = process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY

export const uploadToCloudinary = `${cloudinaryEndpoint}/v1_1/${cloudinaryCloudName}/auto/upload`