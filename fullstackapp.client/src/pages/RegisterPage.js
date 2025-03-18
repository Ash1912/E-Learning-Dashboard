import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Register.css"; // ✅ Import the new CSS file

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "Student", // ✅ Default role as Student
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    };

    // ✅ Handle Registration
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await register(formData);
            setSuccess("🎉 Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <Card className="shadow-lg p-4">
                    <Card.Body>
                        <h2 className="text-center mb-4">Register</h2>

                        {success && <Alert variant="success">{success}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleRegister}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </Button>
                                </InputGroup>
                            </Form.Group>

                            {/* ✅ Role Selection Dropdown */}
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Select name="role" value={formData.role} onChange={handleChange}>
                                    <option value="Student">Student</option>
                                    <option value="Admin">Admin</option>
                                </Form.Select>
                            </Form.Group>

                            <Button variant="success" type="submit" className="w-100" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : "Register"}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;
