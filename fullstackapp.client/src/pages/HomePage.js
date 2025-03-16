import React from "react";
import styled from "styled-components";
import { FaChalkboardTeacher, FaCertificate, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <h1>Welcome to E-Learning</h1>
        <p>Empower yourself with knowledge from experts.</p>
        <Link to="/register">
          <CTAButton>Get Started</CTAButton>
        </Link>
      </HeroSection>

      {/* Features Section */}
      <Features>
        <FeatureCard>
          <FaChalkboardTeacher size={40} className="feature-icon" />
          <h3>Expert Instructors</h3>
          <p>Learn from industry experts with real-world experience.</p>
        </FeatureCard>
        <FeatureCard>
          <FaCertificate size={40} className="feature-icon" />
          <h3>Certification</h3>
          <p>Earn certificates to showcase your skills.</p>
        </FeatureCard>
        <FeatureCard>
          <FaUsers size={40} className="feature-icon" />
          <h3>Community Support</h3>
          <p>Engage with a community of learners.</p>
        </FeatureCard>
      </Features>

      {/* Call-To-Action Section */}
      <CTASection>
        <h2>Start Learning Today</h2>
        <p>Join thousands of students learning new skills every day.</p>
        <Link to="/login">
          <CTAButton>Login Now</CTAButton>
        </Link>
      </CTASection>
    </Container>
  );
};

export default Home;

// Styled Components
const Container = styled.div`
  text-align: center;
`;

// Hero Section
const HeroSection = styled.div`
  background: #222;
  color: white;
  padding: 80px 20px;
  text-align: center;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 10px;
  }
  p {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }
`;

// Features Section
const Features = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 60px 20px;
  background: #f8f8f8;
  flex-wrap: wrap; /* ✅ Responsive for smaller screens */
`;

const FeatureCard = styled.div`
  width: 250px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;

  .feature-icon {
    color: #007bff;
    margin-bottom: 15px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// CTA Section
const CTASection = styled.div`
  background: #007bff;
  color: white;
  padding: 60px 20px;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
`;

// CTA Button
const CTAButton = styled.button`
  background: #ffc107;
  color: #222;
  font-size: 1rem;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e0a800;
    transform: scale(1.05);
  }
`;
