import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { FaSignInAlt, FaUserPlus, FaUserCircle, FaUserShield, FaHome, FaBookOpen, FaUserCog } from "react-icons/fa"; // ✅ Added Profile Icon
import "../styles/Navbar.css"; // ✅ Import CSS for styling

const NavigationBar = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    // ✅ Redirect user to their respective Dashboard
    const handleHomeRedirect = () => {
        if (user) {
            navigate("/dashboard"); // ✅ Both Students & Admins go to Dashboard
        } else {
            navigate("/"); // ✅ Redirect to homepage if not logged in
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top navbar-custom">
            <Container>
                {/* ✅ Brand Logo */}
                <Navbar.Brand as={Link} to="/" className="brand-logo">
                    <FaBookOpen className="brand-logo-icon" /> E-Learning
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        {/* ✅ Display Student & Admin Panel */}
                        {user?.role === "Student" && <span className="nav-item student-panel">🎓 Student Panel</span>}
                        {user?.role === "Admin" && (
                            <span className="nav-item admin-panel">
                                <FaUserShield className="nav-icon" /> Admin Panel
                            </span>
                        )}
                    </Nav>
                    <Nav className="ms-auto">
                        {/* ✅ Home Button */}
                        <Button variant="outline-light" className="nav-home-btn" onClick={handleHomeRedirect}>
                            <FaHome className="nav-icon" /> Home
                        </Button>

                        {/* ✅ Show Profile Button for Admin Users */}
                        {user?.role === "Admin" && (
                            <Button
                                variant="outline-light"
                                className="nav-profile-btn"
                                onClick={() => navigate("/profile")}
                            >
                                <FaUserCog className="nav-icon" /> Profile
                            </Button>
                        )}

                        {/* ✅ User Auth Buttons */}
                        {user ? (
                            <>
                                <span className="welcome-text">
                                    <FaUserCircle className="nav-icon" /> {user.name}
                                </span>
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
