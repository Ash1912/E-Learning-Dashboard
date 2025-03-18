import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, updateCourse } from "../services/courseService";
import { Card, Form, Button, Alert, Container, Spinner } from "react-bootstrap";

const EditCoursePage = () => {
    const { courseId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const courseData = await getCourseById(courseId);
                setTitle(courseData.title);
                setDescription(courseData.description);
                setVideoUrl(courseData.videoUrl);
                setImageUrl(courseData.imageUrl);
                setLoading(false);
            } catch (error) {
                setError("Failed to load course details.");
                setLoading(false);
            }
        };
        fetchCourse();
    }, [courseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !videoUrl || !imageUrl) {
            setError("All fields are required.");
            return;
        }

        try {
            await updateCourse(courseId, { title, description, videoUrl, imageUrl });
            setSuccess("Course updated successfully!");
            setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2s
        } catch (error) {
            setError(error || "Failed to update course.");
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Edit Course</h2>
            <Card className="p-4 shadow">
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                {loading ? (
                    <Spinner animation="border" variant="primary" className="d-block mx-auto" />
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Video URL</Form.Label>
                            <Form.Control
                                type="text"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Update Course
                        </Button>
                    </Form>
                )}
            </Card>
        </Container>
    );
};

export default EditCoursePage;
