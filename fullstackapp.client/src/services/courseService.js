import axios from 'axios';

const API_URL = 'https://localhost:7209/api/Course';  // ✅ Ensure URL is correct

// ✅ Helper function to attach authentication headers
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

// ✅ Get all courses
export const getCourses = async () => {
    try {
        const response = await axios.get(API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error.response?.data || error.message);
        throw error.response?.data || "Failed to fetch courses";
    }
};

// ✅ Get a single course by ID
export const getCourseById = async (courseId) => {
    try {
        const response = await axios.get(`${API_URL}/${courseId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error fetching course with ID ${courseId}:`, error.response?.data || error.message);
        throw error.response?.data || "Failed to fetch course details";
    }
};

// ✅ Create a new course (Admins only)
export const createCourse = async (courseData) => {
    try {
        const response = await axios.post(API_URL, courseData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error creating course:", error.response?.data || error.message);
        throw error.response?.data || "Failed to create course";
    }
};

// ✅ Update an existing course (Admins only)
export const updateCourse = async (courseId, courseData) => {
    try {
        const response = await axios.put(`${API_URL}/${courseId}`, courseData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error updating course with ID ${courseId}:`, error.response?.data || error.message);
        throw error.response?.data || "Failed to update course";
    }
};

// ✅ Delete a course (Admins only)
export const deleteCourse = async (courseId) => {
    try {
        const response = await axios.delete(`${API_URL}/${courseId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error deleting course with ID ${courseId}:`, error.response?.data || error.message);
        throw error.response?.data || "Failed to delete course";
    }
};
