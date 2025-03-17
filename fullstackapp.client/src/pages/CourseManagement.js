import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ Added useNavigate for redirection
import { getCourseById } from '../services/courseService';
import { toggleEnrollment, getUserEnrollments, updateProgress } from '../services/enrollmentService';
import { getQuizzes, submitQuiz } from '../services/quizService';
import { useSelector } from 'react-redux';
import { Card, Button, Alert, Container } from 'react-bootstrap';
import '../styles/CourseManagement.css';

const CourseManagement = () => {
    const { courseId } = useParams();
    const navigate = useNavigate(); // ✅ Initialize navigation hook
    const user = useSelector(state => state.auth.user);
    const [course, setCourse] = useState(null);
    const [enrolled, setEnrolled] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const [submittedQuizzes, setSubmittedQuizzes] = useState(new Set());
    const [error, setError] = useState(null);

    // ✅ Load Course & Enrollment Status
    const loadCourse = useCallback(async () => {
        try {
            const courseData = await getCourseById(courseId);
            setCourse(courseData);

            const enrollments = await getUserEnrollments(user.id);
            setEnrolled(enrollments.some(enroll => enroll.courseId === Number(courseId)));
        } catch (err) {
            setError("Failed to load course details.");
        }
    }, [courseId, user]);

    useEffect(() => {
        loadCourse();
    }, [loadCourse]);

    // ✅ Fetch Quizzes
    const loadQuizzes = useCallback(async () => {
        try {
            const data = await getQuizzes(courseId);
            setQuizzes(data);
        } catch (err) {
            setError("Failed to load quizzes.");
        }
    }, [courseId]);

    useEffect(() => {
        loadQuizzes();
    }, [loadQuizzes]);

    // ✅ Toggle Enrollment (Enroll or Unenroll)
    const handleToggleEnrollment = async () => {
        try {
            await toggleEnrollment(user.id, courseId);
            setEnrolled(prev => !prev);

            if (enrolled) {
                alert("You have been unenrolled from this course.");
                navigate("/dashboard"); // ✅ Redirect to Dashboard after Unenroll
            } else {
                alert("Enrollment successful! Start learning now.");
            }
        } catch (err) {
            setError("Failed to update enrollment.");
        }
    };

    // ✅ Handle Quiz Submission
    const handleSubmitQuiz = async (quizId, answer) => {
        if (submittedQuizzes.has(quizId)) {
            alert("You have already submitted this quiz.");
            return;
        }

        try {
            const result = await submitQuiz(quizId, user.id, answer);
            alert(result.message);

            setSubmittedQuizzes(prev => {
                const updatedQuizzes = new Set(prev);
                updatedQuizzes.add(quizId);

                // ✅ Ensure progress updates only after all quizzes are completed
                if (updatedQuizzes.size === quizzes.length) {
                    updateProgress(user.id, courseId, 100)
                        .then(() => alert("Course progress updated to 100%!"))
                        .catch((err) => {
                            console.error("Progress update error:", err);
                            setError("Failed to update progress.");
                        });
                }

                return updatedQuizzes;
            });
        } catch (err) {
            setError("Failed to submit quiz.");
        }
    };

    return (
        <Container className="course-container">
            <h2 className="course-title">{course?.title}</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            {course ? (
                <Card className="course-card">
                    <Card.Body>
                        <Card.Text>{course.description}</Card.Text>

                        {/* ✅ YouTube Video Player */}
                        {course.videoUrl ? (
                            <div className="video-container">
                                <iframe 
                                    className="responsive-video"
                                    src={course.videoUrl.replace("watch?v=", "embed/")} 
                                    title="Course Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <p>No video available for this course.</p>
                        )}

                        <Button 
                            variant={enrolled ? "danger" : "primary"} 
                            onClick={handleToggleEnrollment} 
                        >
                            {enrolled ? "Unenroll & Go to Dashboard" : "Enroll & Start Learning"}
                        </Button>
                    </Card.Body>
                </Card>
            ) : (
                <p>Loading course...</p>
            )}

            {/* ✅ Quiz Section */}
            <h3 className="quiz-title">Quiz</h3>
            {quizzes.length > 0 ? (
                quizzes.map(quiz => (
                    <Card key={quiz.id} className="quiz-card">
                        <Card.Body>
                            <Card.Title>{quiz.question}</Card.Title>
                            <div className="quiz-options">
                                {[quiz.optionA, quiz.optionB, quiz.optionC, quiz.optionD].map(option => (
                                    <Button 
                                        key={option} 
                                        variant={submittedQuizzes.has(quiz.id) ? "secondary" : "outline-primary"} 
                                        onClick={() => handleSubmitQuiz(quiz.id, option)}
                                        disabled={submittedQuizzes.has(quiz.id)}
                                        className="quiz-option"
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>No quizzes available for this course.</p>
            )}
        </Container>
    );
};

export default CourseManagement;
