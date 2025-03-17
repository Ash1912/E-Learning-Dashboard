import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../services/courseService";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";

const AddCoursePage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !videoUrl) {
            setError("All fields are required.");
            return;
        }

        try {
            await createCourse({ title, description, videoUrl });
            setSuccess("Course added successfully!");
            setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2s
        } catch (error) {
            setError(error || "Failed to add course.");
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Add New Course</h2>
            <Card className="p-4 shadow">
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleSubmit}>
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

                    <Button variant="success" type="submit" className="w-100">
                        Add Course
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default AddCoursePage;
