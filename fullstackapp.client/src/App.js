import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Container, Spinner } from "react-bootstrap"; // ✅ Improved Loading UI

// ✅ Lazy Load Pages for Performance Optimization
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CourseManagement = lazy(() => import("./pages/CourseManagement"));
const AddCoursePage = lazy(() => import("./pages/AddCoursePage"));
const EditCoursePage = lazy(() => import("./pages/EditCoursePage"));

// ✅ Protected Route Wrapper (Redirects if user is not logged in)
const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    return user ? children : <Navigate to="/login" />;
};

// ✅ Loading Fallback UI (Spinner)
const LoadingFallback = () => (
    <Container className="text-center mt-5">
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
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* ✅ Protected Routes */}
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/course-management/:courseId" element={<ProtectedRoute><CourseManagement /></ProtectedRoute>} />
                        <Route path="/add-course" element={<ProtectedRoute><AddCoursePage /></ProtectedRoute>} />
                        <Route path="/edit-course/:courseId" element={<ProtectedRoute><EditCoursePage /></ProtectedRoute>} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
