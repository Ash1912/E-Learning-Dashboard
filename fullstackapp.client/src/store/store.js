import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== "production", // ✅ Enable Redux DevTools only in development
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // ✅ Extendable middleware setup
});

export default store;
