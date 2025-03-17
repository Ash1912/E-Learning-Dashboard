import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getQuizzes, submitQuiz } from "../services/quizService";
import { useSelector } from "react-redux";
import { Card, Button, Alert, Container } from "react-bootstrap";
import "../styles/Quiz.css";

const Quiz = () => {
    const { courseId } = useParams(); // ✅ Get courseId from URL
    const [quizzes, setQuizzes] = useState([]);
    const [submittedAnswers, setSubmittedAnswers] = useState({}); // ✅ Track submitted answers
    const [error, setError] = useState(null);
    const user = useSelector(state => state.auth.user);

    // ✅ Fetch quizzes for the course
    const loadQuizzes = useCallback(async () => {
        try {
            if (!courseId) return;
            const data = await getQuizzes(courseId);
            setQuizzes(data);
        } catch (err) {
            setError("Failed to load quizzes. Please try again.");
        }
    }, [courseId]);

    useEffect(() => {
        loadQuizzes();
    }, [loadQuizzes]);

    // ✅ Handle quiz submission
    const handleSubmit = async (quizId, answer) => {
        if (submittedAnswers[quizId]) {
            alert("You have already submitted an answer for this question.");
            return;
        }

        try {
            const result = await submitQuiz(quizId, user.id, answer);
            setSubmittedAnswers(prev => ({ ...prev, [quizId]: result.message })); // ✅ Store feedback message
        } catch (err) {
            setError("Failed to submit quiz. Please try again.");
        }
    };

    return (
        <Container className="quiz-container">
            <h2 className="quiz-title">Quiz</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                    <Card key={quiz.id} className="quiz-card shadow-sm">
                        <Card.Body>
                            <Card.Title className="quiz-question">{quiz.question}</Card.Title>
                            <div className="quiz-options">
                                {[quiz.optionA, quiz.optionB, quiz.optionC, quiz.optionD].map((option) => (
                                    <Button
                                        key={option}
                                        variant={submittedAnswers[quiz.id] ? "secondary" : "outline-primary"}
                                        className="quiz-option"
                                        onClick={() => handleSubmit(quiz.id, option)}
                                        disabled={!!submittedAnswers[quiz.id]} // ✅ Disable if already answered
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                            {submittedAnswers[quiz.id] && (
                                <p className="quiz-feedback">{submittedAnswers[quiz.id]}</p>
                            )}
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p className="text-center mt-4">No quizzes available for this course.</p>
            )}
        </Container>
    );
};

export default Quiz;
