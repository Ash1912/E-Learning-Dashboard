import axios from "axios";

const API_URL = "https://localhost:7209/api/Quiz";

// ✅ Helper function to attach authentication headers (if token exists)
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    return { headers };
};

// ✅ Get all quizzes for a course
export const getQuizzes = async (courseId) => {
    try {
        const response = await axios.get(`${API_URL}/${courseId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching quizzes:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch quizzes");
    }
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
