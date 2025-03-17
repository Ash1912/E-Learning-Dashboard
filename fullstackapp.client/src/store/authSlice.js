import { createSlice } from "@reduxjs/toolkit";

// ✅ Safely retrieve and parse user data from localStorage
const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
        return null; // Prevents errors if localStorage data is corrupted
    }
};

const initialState = {
    user: getStoredUser(),
    token: localStorage.getItem("token") || "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // ✅ Set user & token, then store in localStorage
        setUser: (state, action) => {
            const { user, token } = action.payload || {};
            state.user = user || null;
            state.token = token || "";

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
            }
        },

        // ✅ Clear user & token, then remove from localStorage
        logout: (state) => {
            state.user = null;
            state.token = "";
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
