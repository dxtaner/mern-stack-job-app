// Login.js
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError("Please fill in all required fields.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.data.token);

      toast.success("Login successful! Redirecting to dashboard...", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });

      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Incorrect email or password. Please try again.");
      } else {
        setError("An error occurred during login. Please try again later.");
      }

      console.error(
        "Login failed:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
