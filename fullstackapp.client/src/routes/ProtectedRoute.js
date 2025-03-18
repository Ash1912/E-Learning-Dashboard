import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserRole } from "../services/authService";

const ProtectedRoute = ({ element, allowedRoles }) => {
    const user = useSelector((state) => state.auth.user);
    const role = getUserRole();

    // ✅ Redirect to login if user is not authenticated
    if (!user) {
        return <Navigate to="/login" />;
    }

    // ✅ Check if the user's role is allowed
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />; // Redirect to a "403 Unauthorized" page
    }

    return element;
};

export default ProtectedRoute;
