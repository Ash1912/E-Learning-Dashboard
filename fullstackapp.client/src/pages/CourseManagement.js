import { useEffect, useState } from 'react';
import { getCourses, createCourse, deleteCourse } from '../services/courseService';
import { Table, Form, Button, Alert, Container } from 'react-bootstrap';

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            const data = await getCourses();
            setCourses(data);
        } catch (err) {
            setError("Failed to load courses. Please try again.");
        }
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createCourse({ title, description });
            loadCourses();
            setTitle('');
            setDescription('');
        } catch (err) {
            setError("Failed to create course. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            await deleteCourse(courseId);
            loadCourses();
        } catch (err) {
            setError("Failed to delete course. Please try again.");
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Course Management</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            {/* Course Form */}
            <Form onSubmit={handleCreateCourse} className="mb-4">
                <Form.Group className="mb-3">
                    <Form.Label>Course Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Course Title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={2} 
                        placeholder="Enter Course Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Button type="submit" variant="success" disabled={loading}>
                    {loading ? "Creating..." : "Create Course"}
                </Button>
            </Form>

            {/* Course List */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">No courses available.</td>
                        </tr>
                    ) : (
                        courses.map((course, index) => (
                            <tr key={course.id}>
                                <td>{index + 1}</td>
                                <td>{course.title}</td>
                                <td>{course.description}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(course.id)} size="sm">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default CourseManagement;
