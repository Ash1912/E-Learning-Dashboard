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
        <p>Empower yourself with knowledge from industry-leading experts.</p>
        <Link to="/register">
          <CTAButton>Get Started</CTAButton>
        </Link>
      </HeroSection>

      {/* Features Section */}
      <Features>
        <FeatureCard>
          <FaChalkboardTeacher size={50} className="feature-icon" aria-label="Expert Instructors" />
          <h3>Expert Instructors</h3>
          <p>Learn from professionals with hands-on experience.</p>
        </FeatureCard>
        <FeatureCard>
          <FaCertificate size={50} className="feature-icon" aria-label="Earn Certifications" />
          <h3>Earn Certifications</h3>
          <p>Get industry-recognized certificates to boost your career.</p>
        </FeatureCard>
        <FeatureCard>
          <FaUsers size={50} className="feature-icon" aria-label="Join a Community" />
          <h3>Join a Community</h3>
          <p>Engage with learners and grow together.</p>
        </FeatureCard>
      </Features>

      {/* Call-To-Action Section */}
      <CTASection>
        <h2>Start Your Learning Journey Today</h2>
        <p>Join thousands of students upgrading their skills daily.</p>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 80px; /* ✅ Adjust for Navbar height */
  padding-bottom: 60px; /* ✅ Adjust for Footer height */
  font-family: "Arial", sans-serif;
`;

// Hero Section
const HeroSection = styled.section`
  background: #001f3f;
  color: white;
  padding: 80px 20px;
  width: 100%;
  text-align: center;

  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.4rem;
    margin-bottom: 25px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.2rem;
    }
  }
`;

// Features Section
const Features = styled.section`
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 60px 20px;
  background: #f4f4f4;
  flex-wrap: wrap;
  width: 100%;
`;

const FeatureCard = styled.div`
  width: 280px;
  padding: 25px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;

  .feature-icon {
    color: #007bff;
    margin-bottom: 15px;
    transition: transform 0.3s;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 1.1rem;
    color: #555;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);

    .feature-icon {
      transform: scale(1.1);
    }
  }
`;

// CTA Section
const CTASection = styled.section`
  background: #007bff;
  color: white;
  padding: 60px 20px;
  text-align: center;
  width: 100%;

  h2 {
    font-size: 2.2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 2rem;
    }
    p {
      font-size: 1.2rem;
    }
  }
`;

// CTA Button
const CTAButton = styled.button`
  background: #ffc107;
  color: #222;
  font-size: 1.2rem;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e0a800;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 12px 20px;
  }
`;
