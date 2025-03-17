import axios from "axios";

const API_URL = "https://localhost:7209/api/Auth";

// ✅ Helper function to get authentication headers
const getHeaders = (includeAuth = false) => {
    const headers = { "Content-Type": "application/json" };

    if (includeAuth) {
        const token = localStorage.getItem("token");
        if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    return { headers };
};

// ✅ Register a new user
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData, getHeaders());
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Registration failed";
    }
};

// ✅ Login user and store token
export const login = async (email, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/login`,
            { email, password },
            getHeaders()
        );

        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        return { token, user };
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};

// ✅ Logout user (remove token)
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// ✅ Get logged-in user details
export const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

// ✅ Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};
