import axios from "axios";
import { uploadToCloudinary } from "./api-config";

export const UploadToCloudinary = async (data: FormData) => {

    try {
        const response = await axios.post(
            uploadToCloudinary,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
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
                data: error.response
            };
        } else {
            return {
                success: false,
                status: 500,
                message: 'An unexpected error occurred',
                data: null
            };
        }
    }
}