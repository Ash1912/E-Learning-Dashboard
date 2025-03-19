import React from "react";
import styled from "styled-components";
import { FaChalkboardTeacher, FaCertificate, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <h1>Level Up Your Skills</h1>
          <p>Join thousands of learners on the journey to mastery.</p>
          <Link to="/register">
            <CTAButton>Get Started</CTAButton>
          </Link>
        </HeroContent>
      </HeroSection>

      {/* Features Section */}
      <Features>
        <FeatureCard>
          <FaChalkboardTeacher size={50} className="feature-icon" />
          <h3>Expert Instructors</h3>
          <p>Learn from professionals with real-world experience.</p>
        </FeatureCard>
        <FeatureCard>
          <FaCertificate size={50} className="feature-icon" />
          <h3>Earn Certifications</h3>
          <p>Boost your career with recognized certifications.</p>
        </FeatureCard>
        <FeatureCard>
          <FaUsers size={50} className="feature-icon" />
          <h3>Join a Community</h3>
          <p>Engage with like-minded learners worldwide.</p>
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
  font-family: "Poppins", sans-serif;
  overflow-x: hidden;
`;

/* 🎨 Hero Section */
const HeroSection = styled.section`
  background: linear-gradient(to right, #001f3f, #007bff);
  color: white;
  padding: 100px 20px;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const HeroContent = styled.div`
  max-width: 700px;
  animation: fadeIn 1.5s ease-in-out;

  h1 {
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.4rem;
    margin-bottom: 25px;
    opacity: 0.9;
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

/* 🎨 Features Section */
const Features = styled.section`
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 60px 20px;
  background: #f8f9fa;
  flex-wrap: wrap;
  width: 100%;
`;

const FeatureCard = styled.div`
  width: 280px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;

  .feature-icon {
    color: #007bff;
    margin-bottom: 15px;
    transition: transform 0.3s;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #222;
  }

  p {
    font-size: 1.1rem;
    color: #444;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
    background: white;

    .feature-icon {
      transform: scale(1.2);
      color: #ffcc00;
    }
  }
`;

/* 🎨 CTA Section */
const CTASection = styled.section`
  background: linear-gradient(to right, #007bff, #001f3f);
  color: white;
  padding: 80px 20px;
  text-align: center;
  width: 100%;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.4rem;
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

/* 🎨 CTA Button */
const CTAButton = styled.button`
  background: #ffcc00;
  color: #222;
  font-size: 1.2rem;
  padding: 14px 26px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #e0a800;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 12px 20px;
  }
`;
