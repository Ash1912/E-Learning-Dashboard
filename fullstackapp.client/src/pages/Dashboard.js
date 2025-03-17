import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCourses, deleteCourse } from '../services/courseService';
import { getUserEnrollments, toggleEnrollment } from '../services/enrollmentService';
import { Card, Button, Alert, Container, Spinner } from 'react-bootstrap';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const user = useSelector(state => state.auth.user);
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ✅ Load Courses & User Enrollments
    const loadDashboard = useCallback(async () => {
        if (!user?.id) return;
        setLoading(true);

        try {
            console.log(`Loading courses for user ID: ${user.id}`);
            const courseData = await getCourses();
            setCourses(courseData);

            // ✅ Get user's enrolled courses
            const enrolledData = await getUserEnrollments(user.id);
            setEnrollments(enrolledData.map(enroll => enroll.courseId));

            setError(null);
        } catch (error) {
            console.error("Dashboard loading error:", error);
            setError("Failed to load dashboard.");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    // ✅ Toggle Enrollment (Enroll or Unenroll)
    const handleToggleEnrollment = async (courseId) => {
        try {
            await toggleEnrollment(user.id, courseId);
            loadDashboard();

            // ✅ If enrolled, navigate to Course Management
            if (!enrollments.includes(courseId)) {
                navigate(`/course-management/${courseId}`);
            }
        } catch (error) {
            console.error("Enrollment error:", error);
            setError("Failed to update enrollment.");
        }
    };

    // ✅ Handle Course Deletion
    const handleDelete = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            await deleteCourse(courseId);
            alert("Course deleted successfully!");
            loadDashboard();
        } catch (error) {
            console.error("Deletion error:", error);
            setError("Deletion failed.");
        }
    };

    return (
        <Container className="dashboard-container">
            <h2 className="dashboard-title">Welcome, {user?.name}!</h2>
            <h4 className="dashboard-subtitle">Your Dashboard</h4>

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

                                    <Button
                                        variant={enrollments.includes(course.id) ? "danger" : "primary"}
                                        className="dashboard-button"
                                        onClick={() => handleToggleEnrollment(course.id)}
                                    >
                                        {enrollments.includes(course.id) ? "Unenroll" : "Enroll & Start Learning"}
                                    </Button>

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
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p className="no-courses">No courses available</p>
                    )}
                </div>
            )}

            <Button
                variant="dark"
                className="add-course-button"
                onClick={() => navigate('/add-course')}
            >
                + Add New Course
            </Button>
        </Container>
    );
};

export default Dashboard;
