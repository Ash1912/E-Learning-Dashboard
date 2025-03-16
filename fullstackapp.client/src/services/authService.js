import axios from 'axios';

const API_URL = 'https://localhost:7209/api/Auth';

const getHeaders = () => ({
    headers: {
        "Content-Type": "application/json"
    }
});

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, JSON.stringify(userData), getHeaders());
        return response.data;
    } catch (error) {
        throw error.response?.data || "Registration failed";
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/login`,
            JSON.stringify({ email, password }), // Convert to JSON string
            getHeaders()
        );
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Login failed";
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

