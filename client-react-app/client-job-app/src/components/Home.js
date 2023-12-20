// Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to the Job Tracking App</h1>
        <p>
          In the fast-paced world of job hunting, staying organized is the key
          to success. Our Job Tracking App is here to help you effortlessly
          manage your job applications, giving you the edge in your career
          journey.
        </p>
      </header>

      <section className="auth-options">
        <div className="auth-option">
          <p>Already a valued member?</p>
          <p>
            Dive into your opportunities by securely logging in to your account.
          </p>
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </div>

        <div className="auth-option">
          <p>New to our community?</p>
          <p>
            Join us now and unlock the potential of a streamlined job search
            experience.
          </p>
          <Link to="/register" className="auth-link">
            Register
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
