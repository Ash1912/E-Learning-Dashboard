import axios from 'axios';

const API_URL = 'https://localhost:7209/api';

// ✅ Helper function to attach authentication headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
    };
};

// ✅ Get Student Dashboard Data (Enrolled Courses)
export const getStudentDashboard = async (userId) => {
    try {
        console.log(`Fetching dashboard for student (ID: ${userId})`);
        const response = await axios.get(`${API_URL}/Enrollment/${userId}`, getAuthHeaders());
        const enrollments = response.data;

        if (!enrollments.length) return [];

        // Fetch full course details for enrolled courses
        const coursePromises = enrollments.map(enrollment =>
            axios.get(`${API_URL}/Course/${enrollment.courseId}`, getAuthHeaders())
        );

        const courseResponses = await Promise.all(coursePromises);
        const courses = courseResponses.map(res => res.data);

        console.log("Processed Courses:", courses);
        return courses;
    } catch (error) {
        console.error("Error loading student dashboard:", error);
        throw error.response?.data || "Failed to load student dashboard";
    }
};


// ✅ Get Admin Dashboard Data (All Courses)
export const getAdminDashboard = async () => {
    try {
        console.log("Fetching admin dashboard..."); // ✅ Debug Log
        const response = await axios.get(`${API_URL}/Course`, getAuthHeaders());
        console.log("Admin API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error loading admin dashboard:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to load admin dashboard");
    }
};
