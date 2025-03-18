import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa"; // ✅ Social Media Icons
import "../styles/Footer.css"; // ✅ Import CSS for better styling

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light">
            <div className="container text-center">
                <p className="footer-text">
                    &copy; {new Date().getFullYear()} E-Learning. All Rights Reserved.
                </p>
                {/* ✅ Social Media Links */}
                <div className="social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <FaYoutube />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
