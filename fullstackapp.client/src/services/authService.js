import axios from "axios";

const API_URL = "https://localhost:7209/api/Auth";

// ✅ Helper function to handle API errors
const handleError = (error, defaultMessage) => {
    return error?.response?.data?.message || error?.message || defaultMessage;
};

// ✅ Function to check if token is expired
const isTokenExpired = (token) => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        return payload.exp * 1000 < Date.now(); // Check expiration
    } catch {
        return true; // Treat as expired if decoding fails
    }
};

// ✅ Helper function to get authentication headers
const getHeaders = (includeAuth = false) => {
    const headers = { "Content-Type": "application/json" };

    if (includeAuth) {
        const token = localStorage.getItem("token");
        if (token && !isTokenExpired(token)) {
            headers["Authorization"] = `Bearer ${token}`; // ✅ Fixed Template String Issue
        }
    }

    return { headers };
};

// ✅ Register a new user
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData, getHeaders());
        return response.data;
    } catch (error) {
        throw handleError(error, "Registration failed");
    }
};

// ✅ Login user and store token & role
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password }, getHeaders());

        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role); // ✅ Store role for RBAC

        return { token, user };
    } catch (error) {
        throw handleError(error, "Login failed");
    }
};

// ✅ Logout user (remove token & redirect)
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role"); // ✅ Remove role on logout
    window.location.replace("/login"); // ✅ Uses replace() instead of href (better for SPA)
};

// ✅ Get logged-in user details
export const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

// ✅ Get user role (for RBAC)
export const getUserRole = () => {
    return localStorage.getItem("role") || "Student"; // Default to "Student" if no role found
};

// ✅ Check if user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token && !isTokenExpired(token); // ✅ No auto-logout here
};
