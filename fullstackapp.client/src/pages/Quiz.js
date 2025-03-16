import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getQuizzes, submitQuiz } from "../services/quizService";
import { useSelector } from "react-redux";
import { Card, Button, Alert, Container } from "react-bootstrap";

const Quiz = () => {
    const { courseId } = useParams(); // ✅ Get courseId from URL
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState(null);
    const user = useSelector(state => state.auth.user);

    // ✅ Wrap loadQuizzes inside useCallback
    const loadQuizzes = useCallback(async () => {
        try {
            if (!courseId) return;
            const data = await getQuizzes(courseId);
            setQuizzes(data);
        } catch (err) {
            setError("Failed to load quizzes. Please try again.");
        }
    }, [courseId]); // ✅ Dependency included safely

    useEffect(() => {
        loadQuizzes();
    }, [loadQuizzes]); // ✅ Now it's safe to include

    const handleSubmit = async (quizId, answer) => {
        try {
            const result = await submitQuiz(quizId, user.id, answer);
            alert(result.message);
        } catch (err) {
            alert("Failed to submit quiz. Please try again.");
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Quiz</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                    <Card key={quiz.id} className="mb-3 shadow-sm">
                        <Card.Body>
                            <Card.Title>{quiz.question}</Card.Title>
                            <div className="d-flex flex-wrap gap-2">
                                {[quiz.optionA, quiz.optionB, quiz.optionC, quiz.optionD].map((option) => (
                                    <Button
                                        key={option}
                                        variant="outline-primary"
                                        className="quiz-option"
                                        onClick={() => handleSubmit(quiz.id, option)}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
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
