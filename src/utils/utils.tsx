import axios from "axios";
// TODO: add env variable later
export const baseUrl = "http://localhost:8080/";

export const isEmpty = (value: string | null | undefined): boolean => {
    return !value?.trim();
};

export const handleApiError = (error: any) => {
    if (axios.isAxiosError(error)) {
        const code = error?.code;
        const status = error.response?.status;
        const errorData = error.response?.data;

        if (code === "ERR_NETWORK") {
            return Promise.reject(new Error("File size is too large (more than 10MB) or network error occurred."));
        }

        if (status === 500) {
            return Promise.reject(new Error(`Server error: ${errorData?.message || "Internal Server Error"}`));
        } else if (status === 502) {
            return Promise.reject(new Error(`Bad Gateway: ${errorData?.message || "Service unavailable"}`));
        } else if (status === 413) {
            return Promise.reject(new Error(`File too large: ${errorData?.message || "Maximum upload size exceeded"}`));
        } else {
            return Promise.reject(new Error(errorData?.message || "An unexpected error occurred"));
        }
    }

    return Promise.reject(new Error("Network error or unexpected issue"));
}