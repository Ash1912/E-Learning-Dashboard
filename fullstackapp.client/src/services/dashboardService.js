import axios from "axios";

const API_URL = "https://localhost:7209/api";

// ✅ Helper function to attach authentication headers (if token exists)
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    return { headers };
};

// ✅ Get Student Dashboard (Fetch only enrolled courses)
export const getStudentDashboard = async (userId) => {
    try {
        console.log(`Fetching dashboard for student (ID: ${userId})`);
        const response = await axios.get(`${API_URL}/Enrollment/${userId}`, getAuthHeaders());
        const enrollments = response.data;

        if (!enrollments.length) return [];

        // ✅ Fetch full course details for enrolled courses (Handle failed API calls gracefully)
        const courseRequests = enrollments.map((enrollment) =>
            axios.get(`${API_URL}/Course/${enrollment.courseId}`, getAuthHeaders())
        );

        const courseResponses = await Promise.allSettled(courseRequests);

        // ✅ Extract successful responses only
        const courses = courseResponses
            .filter((res) => res.status === "fulfilled")
            .map((res) => res.value.data);

        console.log("Processed Courses:", courses);
        return courses;
    } catch (error) {
        console.error("❌ Error loading student dashboard:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to load student dashboard");
    }
};

// ✅ Get Admin Dashboard (Fetch all available courses)
export const getAdminDashboard = async () => {
    try {
        console.log("Fetching admin dashboard...");
        const response = await axios.get(`${API_URL}/Course`, getAuthHeaders());
        return response.data; // Returns all courses
    } catch (error) {
        console.error("❌ Error loading admin dashboard:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to load admin dashboard");
    }
};
