import "../styles/Footer.css"; // Import CSS for better styling

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light">
            <div className="container text-center">
                <p className="footer-text">
                    &copy; {new Date().getFullYear()} E-Learning. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
