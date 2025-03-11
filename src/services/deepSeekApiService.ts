
import axios from 'axios';

const DEEPSEEK_API_URL = '/api';
// Change to ENV_VARIABLE
const API_KEY = 'api key';

export const callDeepSeekAPI = async (inputText: string, file: File) => {
    try {
        // Create a FormData object
        const formData = new FormData();
        formData.append('input', inputText); // Append the input text
        formData.append('file', file); // Append the file

        // Make the API request
        const response = await axios.post(DEEPSEEK_API_URL, formData, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'multipart/form-data', // Set the content type for file upload
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error calling DeepSeek API:', error);
        throw error;
    }
};