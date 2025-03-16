import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCourses, deleteCourse } from '../services/courseService';
import { enrollInCourse, getUserEnrollments } from '../services/enrollmentService';
import { Card, Button, Alert, Container, Spinner } from 'react-bootstrap';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const user = useSelector(state => state.auth.user);
    const [courses, setCourses] = useState([]);
    const [userEnrollments, setUserEnrollments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ✅ Load Courses & User Enrollments (Admin & Student)
    const loadDashboard = useCallback(async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            console.log(`Loading courses for ${user?.role} (ID: ${user?.id})`);
            
            const [courseData, enrollmentData] = await Promise.all([
                getCourses(),
                user?.role === 'Student' ? getUserEnrollments(user.id) : Promise.resolve([])
            ]);

            setCourses(courseData);
            setUserEnrollments(enrollmentData.map(enroll => enroll.courseId)); // Store enrolled course IDs
            setError(null);
        } catch (error) {
            console.error("Dashboard loading error:", error);
            setError(error?.message || "Failed to load dashboard.");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    // ✅ Handle Enrollment (Prevents duplicate enrollments)
    const handleEnroll = async (courseId) => {
        if (userEnrollments.includes(courseId)) {
            alert("You are already enrolled in this course.");
            return;
        }

        try {
            await enrollInCourse(user.id, courseId);
            alert("Enrollment successful!");
            loadDashboard(); // Refresh after enrollment
        } catch (error) {
            console.error("Enrollment error:", error);
            setError(error?.message || "Enrollment failed.");
        }
    };

    // ✅ Handle Course Deletion (Admin)
    const handleDelete = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            await deleteCourse(courseId);
            alert("Course deleted successfully!");
            loadDashboard(); // Refresh after deletion
        } catch (error) {
            console.error("Deletion error:", error);
            setError(error?.message || "Deletion failed.");
        }
    };

    return (
        <Container className="dashboard-container">
            <h2 className="dashboard-title">Welcome, {user?.name}!</h2>
            <h4 className="dashboard-subtitle">{user?.role} Dashboard</h4>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
                <div className="loading-spinner">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading courses...</p>
                </div>
            ) : (
                <div className="dashboard-courses">
                    {courses.length > 0 ? (
                        courses.map(course => (
                            <Card key={course.id} className="dashboard-card">
                                <Card.Body>
                                    <Card.Title className="card-title">{course.title}</Card.Title>
                                    <Card.Text className="card-text">{course.description}</Card.Text>
                                    {user?.role === 'Admin' ? (
                                        <>
                                            <Button 
                                                variant="warning" 
                                                className="dashboard-button" 
                                                onClick={() => navigate(`/edit-course/${course.id}`)}
                                            >
                                                Edit Course
                                            </Button>
                                            <Button 
                                                variant="danger" 
                                                className="dashboard-button" 
                                                onClick={() => handleDelete(course.id)}
                                            >
                                                Delete Course
                                            </Button>
                                        </>
                                    ) : (
                                        <Button 
                                            variant={userEnrollments.includes(course.id) ? "secondary" : "primary"} 
                                            className="dashboard-button" 
                                            onClick={() => handleEnroll(course.id)}
                                            disabled={userEnrollments.includes(course.id)}
                                        >
                                            {userEnrollments.includes(course.id) ? "Already Enrolled" : "Enroll in Course"}
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p className="no-courses">No courses available</p>
                    )}
                </div>
            )}

            {user?.role === 'Admin' && (
                <Button 
                    variant="dark" 
                    className="add-course-button" 
                    onClick={() => navigate('/add-course')}
                >
                    + Add New Course
                </Button>
            )}
        </Container>
    );
};

export default Dashboard;
