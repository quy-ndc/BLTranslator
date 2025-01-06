import axios from "axios";
import { uploadVideo } from "./api-config";

export const UploadVideo = async ({
    Video,
    UserId
}: {
    Video: string,
    UserId: string
}) => {

    try {
        const response = await axios.post(
            uploadVideo,
            {
                video: Video,
                userId: UserId
            }
        );
        return {
            success: true,
            status: response.status,
            data: response.data
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                status: error.response.status,
                message: error.response.data.message || 'An error occurred',
                data: error.response.data
            };
        } else {
            return {
                success: false,
                status: 500,
                message: 'An unexpected error occurred',
                data: null
            }
        }
    }
}