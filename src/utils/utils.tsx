import axios from "axios";
import React from "react";
import {TransitionProps} from "@mui/material/transitions";
import {Slide} from "@mui/material";

export const baseUrl = process.env.LC_BASE_URL;

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

export const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});