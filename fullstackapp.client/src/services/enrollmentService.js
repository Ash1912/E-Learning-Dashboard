import axios from 'axios';

const API_URL = 'https://localhost:7209/api/Enrollment';

// ✅ Helper function to attach authentication headers
const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

// ✅ Enroll in a course (Student Only)
export const enrollInCourse = async (userId, courseId) => {
    try {
        const enrollmentData = { userId, courseId, status: "Enrolled", progress: 0 };
        const response = await axios.post(`${API_URL}/enroll`, enrollmentData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error enrolling in course:", error.response?.data || error.message);
        throw new Error(error.response?.data || "Failed to enroll in course");
    }
};

// ✅ Get all enrollments for a user
export const getUserEnrollments = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching enrollments:", error.response?.data || error.message);
        throw new Error(error.response?.data || "Failed to fetch enrollments");
    }
};

// ✅ Update progress in a course
export const updateProgress = async (userId, courseId, progress) => {
    try {
        const response = await axios.put(`${API_URL}/update-progress`, { userId, courseId, progress }, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error updating progress:", error.response?.data || error.message);
        throw new Error(error.response?.data || "Failed to update progress");
    }
};
