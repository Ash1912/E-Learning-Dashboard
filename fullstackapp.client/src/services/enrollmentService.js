import axios from "axios";

const API_URL = "https://localhost:7209/api/Enrollment";

// ✅ Helper function to attach authentication headers (if token exists)
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    return { headers };
};

// ✅ Toggle Enrollment (Enroll/Unenroll in a course)
export const toggleEnrollment = async (userId, courseId) => {
    try {
        const enrollmentData = { userId, courseId };
        const response = await axios.post(`${API_URL}/toggle-enrollment`, enrollmentData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error toggling enrollment:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to toggle enrollment");
    }
};

// ✅ Get all enrollments for a user
export const getUserEnrollments = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching enrollments:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch enrollments");
    }
};

// ✅ Update Progress (Ensure API compatibility)
export const updateProgress = async (userId, courseId, progress) => {
    try {
        const progressData = { userId, courseId, progress }; // ✅ Match Backend Model
        console.log("Updating Progress:", progressData);

        const response = await axios.put(`${API_URL}/update-progress`, progressData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error updating progress:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to update progress");
    }
};
