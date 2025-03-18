import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCourses, deleteCourse } from "../services/courseService";
import { getUserEnrollments, toggleEnrollment } from "../services/enrollmentService";
import { Card, Button, Alert, Container, Spinner, Row, Col } from "react-bootstrap";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);
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
            setEnrollments(enrolledData.map((enroll) => enroll.courseId));

            setError(null);
        } catch (error) {
            console.error("Dashboard loading error:", error);
            setError("Failed to load dashboard.");
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    // ✅ Toggle Enrollment (Enroll or Unenroll)
    const handleToggleEnrollment = async (courseId) => {
        try {
            await toggleEnrollment(user.id, courseId);
            loadDashboard();

            if (!enrollments.includes(courseId)) {
                alert("📢 Enrollment successful! Redirecting to course...");
                navigate(`/course-management/${courseId}`); // ✅ Redirect to course page after enrollment
            } else {
                alert("You have been unenrolled.");
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
                <Row className="dashboard-courses">
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <Col key={course.id} xs={12} sm={6} md={4} lg={4} className="course-col">
                                <Card className="dashboard-card">
                                    {/* ✅ Display Course Image */}
                                    <Card.Img variant="top" src={course.imageUrl} alt={course.title} className="course-image" />
                                    
                                    <Card.Body>
                                        <Card.Title className="card-title">{course.title}</Card.Title>
                                        <Card.Text className="card-text">{course.description}</Card.Text>

                                        {/* ✅ Enrollment button only visible for Students */}
                                        {user.role === "Student" && (
                                            <>
                                                <Button
                                                    variant={enrollments.includes(course.id) ? "danger" : "primary"}
                                                    className="dashboard-button"
                                                    onClick={() => handleToggleEnrollment(course.id)}
                                                >
                                                    {enrollments.includes(course.id) ? "Unenroll" : "Enroll & Start Learning"}
                                                </Button>

                                                {/* ✅ "Go to Course" Button */}
                                                {enrollments.includes(course.id) && (
                                                    <Button
                                                        variant="warning"
                                                        className="dashboard-button go-to-course-btn"
                                                        onClick={() => navigate(`/course-management/${course.id}`)}
                                                    >
                                                        🎥 Go to Course
                                                    </Button>
                                                )}
                                            </>
                                        )}

                                        {/* ✅ Admin-only actions */}
                                        {user.role === "Admin" && (
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
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p className="no-courses">No courses available</p>
                    )}
                </Row>
            )}

            {/* ✅ Only Admins can add new courses */}
            {user.role === "Admin" && (
                <Button
                    variant="dark"
                    className="add-course-button"
                    onClick={() => navigate("/add-course")}
                >
                    + Add New Course
                </Button>
            )}
        </Container>
    );
};

export default Dashboard;
