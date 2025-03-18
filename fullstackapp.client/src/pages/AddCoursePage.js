import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../services/courseService";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import "../styles/AddCoursePage.css"; // ✅ Import CSS for styling

const AddCoursePage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !videoUrl || !imageUrl) {
            setError("All fields are required.");
            return;
        }

        try {
            await createCourse({ title, description, videoUrl, imageUrl });
            setSuccess("Course added successfully!");
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (error) {
            setError(error || "Failed to add course.");
        }
    };

    return (
        <Container className="add-course-container">
            <h2 className="text-center">Add New Course</h2>
            <Card className="add-course-card shadow">
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleSubmit} className="add-course-form">
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter course title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter course description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Video URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter video URL"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter image URL"
                            value={videoUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="success" type="submit" className="add-course-btn">
                        Add Course
                    </Button>
                </Form>
            </Card>

            {/* ✅ Footer Spacing */}
            <div className="add-course-footer-space"></div>
        </Container>
    );
};

export default AddCoursePage;
