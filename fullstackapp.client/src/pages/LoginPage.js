import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css"; // ✅ Import new styles

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ✅ Email Validation
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // ✅ Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!email.trim() || !password.trim()) {
            setError("Both email and password are required.");
            setLoading(false);
            return;
        }

        if (!isValidEmail(email)) {
            setError("Invalid email format.");
            setLoading(false);
            return;
        }

        try {
            const data = await login(email, password);
            dispatch(setUser(data));
            navigate("/dashboard");
        } catch (err) {
            setError(err?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <Card className="shadow-lg p-4">
                    <Card.Body>
                        <h2 className="login-title">Login</h2>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleLogin} className="login-form">
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="login-input"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="login-input"
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="password-toggle-btn"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </Button>
                                </InputGroup>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="login-btn w-100" disabled={loading}>
                                {loading ? <Spinner as="span" animation="border" size="sm" /> : "Login"}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
