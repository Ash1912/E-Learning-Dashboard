import axios from 'axios';

const API_URL = 'https://localhost:7209/api/User';

const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

// ✅ Fetch user details (without exposing password)
export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`, getAuthHeaders());
        return response.data;  // Returns { id, name, email }
    } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        throw error.response?.data || "Failed to fetch user";
    }
};

// ✅ Update user profile (Includes password only if provided)
export const updateUser = async (userData) => {
    try {
        // ✅ Ensure user ID is included (Backend requires it)
        if (!userData.id) throw new Error("User ID is required for updates.");

        const response = await axios.put(`${API_URL}/update`, userData, getAuthHeaders());
        return response.data;  // Returns { message: "Profile updated successfully!" }
    } catch (error) {
        console.error("Error updating user:", error.response?.data || error.message);
        throw error.response?.data || "Failed to update user";
    }
};
