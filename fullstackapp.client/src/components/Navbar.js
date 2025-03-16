import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Import Icons
import "../styles/Navbar.css"; // Import CSS file for styling

const NavigationBar = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top navbar-custom">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand-logo">
                    E-Learning
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        {user?.role === "Admin" && (
                            <Nav.Link as={Link} to="/courses" className="nav-item">
                                Manage Courses
                            </Nav.Link>
                        )}
                        {user?.role === "Student" && (
                            <Nav.Link as={Link} to="/enrollments" className="nav-item">
                                My Courses
                            </Nav.Link>
                        )}
                    </Nav>
                    <Nav className="ms-auto">
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/profile" className="welcome-text">
                                    Welcome, {user.name}!
                                </Nav.Link>
                                <Button className="logout-btn" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="nav-btn">
                                    <FaSignInAlt className="nav-icon" /> Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register" className="nav-btn">
                                    <FaUserPlus className="nav-icon" /> Register
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
