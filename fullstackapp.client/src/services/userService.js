import axios from "axios";
import { logout } from "./authService"; // ✅ Auto logout if unauthorized

const API_URL = "https://localhost:7209/api/User";

// ✅ Attach authentication headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token
        ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        : { "Content-Type": "application/json" };
};

// ✅ Centralized API Request Handler
const requestHandler = async (method, url, data = null, auth = false) => {
    try {
        const config = auth ? { headers: getAuthHeaders() } : {};
        const response = await axios({ method, url, data, ...config });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            logout();
            window.location.href = "/login"; // Redirect to login
        }

        // ✅ Log validation errors
        if (error.response?.status === 400 && error.response?.data?.errors) {
            console.error("Validation Errors:", error.response.data.errors);
        }

        console.error(`API Error (${method.toUpperCase()} ${url}):`, error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred while processing the request.");
    }
};

// ✅ Fetch user details
export const getUser = (userId) => requestHandler("get", `${API_URL}/${userId}`, null, true);

// ✅ Fetch all users (Admin Only)
export const getAllUsers = () => requestHandler("get", `${API_URL}/all`, null, true);

// ✅ Update user profile
export const updateUser = async (userData) => {
    if (!userData.id) throw new Error("User ID is required for updates.");

    // ✅ Prevent sending empty password field
    const updateData = { ...userData };
    if (!updateData.password?.trim()) delete updateData.password; // ✅ Fix: Removes empty password field

    return requestHandler("put", `${API_URL}/update`, updateData, true);
};

