const cloudinaryEndpoint = process.env.EXPO_PUBLIC_CLOUDINARY_END_POINT
const cloudinaryCloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME
const cloudinaryCloudKey = process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY
const bltEndpoint = process.env.EXPO_PUBLIC_BLT_ENDPOINT


export const uploadToCloudinary = `${cloudinaryEndpoint}/v1_1/${cloudinaryCloudName}/auto/upload`
export const uploadVideo = `${bltEndpoint}/files`
