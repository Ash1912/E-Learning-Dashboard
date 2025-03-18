import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Container, Spinner } from "react-bootstrap"; // ✅ Improved Loading UI

// ✅ Lazy Load Pages for Performance Optimization
const Home = lazy(() => import("./pages/HomePage"));
const Login = lazy(() => import("./pages/LoginPage"));
const Register = lazy(() => import("./pages/RegisterPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CourseManagement = lazy(() => import("./pages/CourseManagement"));
const AddCourse = lazy(() => import("./pages/AddCoursePage"));
const EditCourse = lazy(() => import("./pages/EditCoursePage"));
const Profile = lazy(() => import("./pages/Profile")); // ✅ Added Profile Page

// ✅ Protected Route Wrapper (Redirects if user is not logged in)
const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    return user ? children : <Navigate to="/login" />;
};

// ✅ Admin Route Wrapper (Restricts to Admins only)
const AdminRoute = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    return user && user.role === "Admin" ? children : <Navigate to="/dashboard" />;
};

// ✅ Redirect Authenticated Users from Login/Register to Dashboard
const AuthRedirect = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    return user ? <Navigate to="/dashboard" /> : children;
};

// ✅ Loading Fallback UI (Spinner)
const LoadingFallback = () => (
    <Container className="text-center mt-5" style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
    </Container>
);

const App = () => {
    return (
        <Router>
            <Navbar />
            <main className="content">
                <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
                        <Route path="/register" element={<AuthRedirect><Register /></AuthRedirect>} />

                        {/* ✅ Protected Routes (Only Logged-in Users) */}
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path="/course-management/:courseId" element={<ProtectedRoute><CourseManagement /></ProtectedRoute>} />

                        {/* ✅ Admin-only Routes */}
                        <Route path="/add-course" element={<AdminRoute><AddCourse /></AdminRoute>} />
                        <Route path="/edit-course/:courseId" element={<AdminRoute><EditCourse /></AdminRoute>} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
