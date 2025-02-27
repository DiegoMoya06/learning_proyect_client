import axios from "axios";
import {baseUrl} from "../utils/utils.tsx";

const cgURL = "cg_controller";
const dsURL = "ds_controller";
export const AIService = {
    async createDeckFromCG(file: File) {
        const formData = new FormData();
        formData.append('file', file); // Append the file
        const response = await axios
            .post(`${baseUrl}${cgURL}/send-input-from-file`, formData);
        console.log("response", response.data);

        return response.data;
    },

    async createDeckFromDS(file: File) {
        const formData = new FormData();
        formData.append('file', file); // Append the file
        const response = await axios
            .post(`${baseUrl}${dsURL}/send-input-from-file`, formData);
        console.log("response", response.data);

        return response.data;
    }
}