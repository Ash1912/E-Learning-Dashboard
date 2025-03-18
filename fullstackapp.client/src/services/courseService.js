import axios from "axios";

const API_URL = "https://localhost:7209/api/Course"; // ✅ Ensure URL is correct

// ✅ Helper function to attach authentication headers (if token exists)
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    return headers;
};

// ✅ Centralized API request handler
const requestHandler = async (method, url, data = null, auth = false) => {
    try {
        const config = auth ? { headers: getAuthHeaders() } : {};
        const response = await axios({ method, url, data, ...config });
        return response.data;
    } catch (error) {
        console.error(`API Error (${method.toUpperCase()} ${url}):`, error.response?.data || error.message);
        throw error.response?.data?.message || "An error occurred while processing the request.";
    }
};

// ✅ Get all courses
export const getCourses = () => requestHandler("get", API_URL, null, true);

// ✅ Get a single course by ID
export const getCourseById = (courseId) => requestHandler("get", `${API_URL}/${courseId}`, null, true);

// ✅ Create a new course (Admin Only)
export const createCourse = async (courseData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role !== "Admin") throw new Error("Unauthorized: Only Admins can create courses.");

    return requestHandler("post", API_URL, courseData, true);
};

// ✅ Update an existing course (Admin Only)
export const updateCourse = async (courseId, courseData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role !== "Admin") throw new Error("Unauthorized: Only Admins can update courses.");

    return requestHandler("put", `${API_URL}/${courseId}`, courseData, true);
};

// ✅ Delete a course (Admin Only)
export const deleteCourse = async (courseId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role !== "Admin") throw new Error("Unauthorized: Only Admins can delete courses.");

    return requestHandler("delete", `${API_URL}/${courseId}`, null, true);
};
