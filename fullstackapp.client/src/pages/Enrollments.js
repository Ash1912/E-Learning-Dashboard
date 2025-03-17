import { useEffect, useState, useCallback } from 'react';
import { getCourses } from '../services/courseService';
import { enrollInCourse, getUserEnrollments } from '../services/enrollmentService';
import { useSelector } from 'react-redux';
import { Card, Button, Alert, Container } from 'react-bootstrap';

const Enrollments = () => {
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [error, setError] = useState(null);
    const user = useSelector(state => state.auth.user);

    // ✅ Fetch all courses
    const loadCourses = useCallback(async () => {
        try {
            const data = await getCourses();
            setCourses(data);
        } catch (err) {
            setError("Failed to load courses. Please try again.");
        }
    }, []);

    // ✅ Fetch user's enrollments
    const loadEnrollments = useCallback(async () => {
        try {
            if (!user) return;
            const data = await getUserEnrollments(user.id);
            setEnrollments(data);
        } catch (err) {
            setError("Failed to load enrollments. Please try again.");
        }
    }, [user]);

    useEffect(() => {
        loadCourses();
        loadEnrollments();
    }, [loadCourses, loadEnrollments]);

    // ✅ Toggle Enrollment (Enroll/Unenroll)
    const handleToggleEnrollment = async (courseId) => {
        try {
            await enrollInCourse(user.id, courseId);
            loadEnrollments(); // ✅ Refresh enrollments after toggle
        } catch (err) {
            setError("Failed to update enrollment. Please try again.");
        }
    };

    // ✅ Check if user is enrolled in a course
    const isEnrolled = (courseId) => enrollments.some(enroll => enroll.courseId === courseId);

    return (
        <Container className="mt-4">
            <h2 className="text-center">Enrollments</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            {/* Available Courses */}
            <h3 className="mt-4">Available Courses</h3>
            <div className="row">
                {courses.length === 0 ? (
                    <p className="text-center">No courses available.</p>
                ) : (
                    courses.map(course => (
                        <div className="col-md-4" key={course.id}>
                            <Card className="mb-3 shadow-sm">
                                <Card.Body>
                                    <Card.Title>{course.title}</Card.Title>
                                    <Card.Text>{course.description}</Card.Text>
                                    <Button 
                                        variant={isEnrolled(course.id) ? "danger" : "primary"} 
                                        onClick={() => handleToggleEnrollment(course.id)}
                                    >
                                        {isEnrolled(course.id) ? "Unenroll" : "Enroll"}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                )}
            </div>

            {/* Enrolled Courses */}
            <h3 className="mt-4">Your Enrollments</h3>
            <ul className="list-group">
                {enrollments.length === 0 ? (
                    <p className="text-center">You have not enrolled in any courses yet.</p>
                ) : (
                    enrollments.map(enroll => {
                        const course = courses.find(c => c.id === enroll.courseId);
                        return (
                            <li key={enroll.id} className="list-group-item d-flex justify-content-between align-items-center">
                                {course ? course.title : `Course ID: ${enroll.courseId}`}
                                <span className="badge bg-success">Progress: {enroll.progress}%</span>
                            </li>
                        );
                    })
                )}
            </ul>
        </Container>
    );
};

export default Enrollments;
