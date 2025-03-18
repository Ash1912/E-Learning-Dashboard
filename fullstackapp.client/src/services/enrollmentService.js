import axios from "axios";

const API_URL = "https://localhost:7209/api/Enrollment";

// ✅ Helper function to attach authentication headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    return { headers };
};

// ✅ Toggle Enrollment (Enroll/Unenroll in a course)
export const toggleEnrollment = async (userId, courseId) => {
    try {
        const enrollmentData = {
            userId: Number(userId),  // ✅ Ensure it is a number
            courseId: Number(courseId),
            status: "Enrolled",  // ✅ Required by backend model
            progress: 0          // ✅ Required field in the `Enrollment` model
        };

        console.log("🚀 Sending enrollment request:", enrollmentData);

        const response = await axios.post(
            `${API_URL}/toggle-enrollment`,
            enrollmentData, 
            { headers: getAuthHeaders() }
        );

        return response.data;
    } catch (error) {
        console.error("🚨 API Error (POST /toggle-enrollment):", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred while processing the request.");
    }
};

// ✅ Get all enrollments for a user
export const getUserEnrollments = async (userId) => {
    return await axios.get(`${API_URL}/${userId}`, { headers: getAuthHeaders() })
        .then(response => response.data)
        .catch(error => {
            console.error("🚨 Error fetching enrollments:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Failed to fetch enrollments.");
        });
};

// ✅ Update user's progress in a course
export const updateProgress = async (userId, courseId, progress) => {
    try {
        const progressData = {
            userId: Number(userId),  // ✅ Ensure Number
            courseId: Number(courseId),  // ✅ Ensure Number
            progress: Math.min(100, Math.max(0, Number(progress))),  // ✅ Clamp between 0-100
            status: "Enrolled"  // ✅ Add required status field
        };

        console.log("🚀 Debug - Sending Progress Update:", progressData);

        // ✅ Check if enrollment exists before updating
        const enrollments = await getUserEnrollments(userId);
        const isEnrolled = enrollments.some(enroll => enroll.courseId === Number(courseId));

        if (!isEnrolled) {
            console.error("❌ Error: User is not enrolled in this course.");
            throw new Error("User is not enrolled in this course.");
        }

        const response = await axios.put(`${API_URL}/update-progress`, progressData, {
            headers: {
                "Content-Type": "application/json",  // ✅ Ensure JSON content type
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        return response.data;
    } catch (error) {
        console.error("❌ Error updating progress:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to update progress");
    }
};
