import axios from "axios";
import { logout } from "./authService"; // ✅ Auto logout on unauthorized error

const API_URL = "https://localhost:7209/api/Quiz";

// ✅ Helper function to attach authentication headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    return headers;
};

// ✅ Centralized API Request Handler
const requestHandler = async (method, url, data = null, auth = false) => {
    try {
        const config = auth ? { headers: getAuthHeaders() } : {};
        const response = await axios({ method, url, data, ...config });
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message || "An error occurred while processing the request.";

        // ✅ Auto logout if unauthorized
        if (status === 401) {
            logout();
            window.location.href = "/login"; // Redirect to login
        }

        console.error(`API Error (${method.toUpperCase()} ${url}):`, errorMessage);
        throw new Error(errorMessage);
    }
};

// ✅ Get all quizzes for a course
export const getQuizzes = async (courseId) => {
    return await requestHandler("get", `${API_URL}/${courseId}`, null, true);
};

// ✅ Submit a quiz response (Backend handles correctness)
export const submitQuiz = async (quizId, userId, selectedAnswer) => {
    try {
        const quizResponse = { quizId, userId, selectedAnswer };
        const response = await axios.post(`${API_URL}/submit`, quizResponse, getAuthHeaders());
        
        // ✅ Check if the answer is correct and return appropriate message
        if (response.data.isCorrect) {
            return { message: "Correct answer!", isCorrect: true };
        } else {
            return { message: `Incorrect! The correct answer is: ${response.data.message.split(": ")[1]}`, isCorrect: false };
        }
    } catch (error) {
        console.error("Error submitting quiz:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to submit quiz");
    }
};



