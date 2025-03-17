import axios from "axios";

const API_URL = "https://localhost:7209/api/User";

// ✅ Helper function to attach authentication headers (if token exists)
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    return { headers };
};

// ✅ Fetch user details (without exposing password)
export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`, getAuthHeaders());
        return response.data; // Returns { id, name, email }
    } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch user");
    }
};

// ✅ Update user profile (Includes password only if provided)
export const updateUser = async (userData) => {
    try {
        // ✅ Ensure user ID is included (Backend requires it)
        if (!userData.id) throw new Error("User ID is required for updates.");

        const response = await axios.put(`${API_URL}/update`, userData, getAuthHeaders());
        return response.data; // Returns { message: "Profile updated successfully!" }
    } catch (error) {
        console.error("Error updating user:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to update user");
    }
};

// ✅ Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData, getAuthHeaders());
        return response.data; // Returns { message: "User registered successfully!" }
    } catch (error) {
        console.error("Error registering user:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to register user");
    }
};
