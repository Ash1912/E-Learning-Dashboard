import axios from 'axios';

const API_URL = 'https://localhost:7209/api/Quiz';

// ✅ Helper function to attach authentication headers
const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

// ✅ Get all quizzes for a course
export const getQuizzes = async (courseId) => {
    try {
        const response = await axios.get(`${API_URL}/${courseId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching quizzes:", error.response?.data || error.message);
        throw error.response?.data || "Failed to fetch quizzes";
    }
};

// ✅ Submit a quiz response (Student Only)
export const submitQuiz = async (quizId, userId, selectedAnswer) => {
    try {
        const quizResponse = { quizId, userId, selectedAnswer }; // ✅ Do NOT send isCorrect (handled by backend)
        const response = await axios.post(`${API_URL}/submit`, quizResponse, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error submitting quiz:", error.response?.data || error.message);
        throw error.response?.data || "Failed to submit quiz";
    }
};
