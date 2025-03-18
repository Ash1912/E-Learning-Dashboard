import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: process.env.NODE_ENV === "development", // ✅ Enable Redux DevTools only in dev mode
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // ✅ Avoid Redux warnings for non-serializable state
        }),
});

// ✅ Persist Redux State to Local Storage (Authentication)
store.subscribe(() => {
    const state = store.getState();
    if (state.auth?.user) {
        localStorage.setItem("user", JSON.stringify(state.auth.user));
        localStorage.setItem("token", state.auth.token);
    } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }
});

export default store;
