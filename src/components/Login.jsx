import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import "../styles/Login.css";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    const data = { phone, password, rememberMe };

    try {
      console.log("Attempting login with:", phone);
      const response = await axios.post(
        "http://localhost:5000/api/login",
        data
      );

      console.log("Login response:", response.data);

      if (response.status === 200 && response.data) {
        // Extract token and user information
        const { token, userId, role } = response.data;

        if (!token || !userId) {
          console.error("Missing token or userId in response:", response.data);
          setError("Login successful but missing authentication data");
          return;
        }

        // Store auth data in localStorage with additional safeguards
        try {
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          localStorage.setItem("userRole", role || "client");

          // Verify storage was successful
          const storedToken = localStorage.getItem("token");
          const storedUserId = localStorage.getItem("userId");

          if (storedToken !== token || storedUserId !== userId) {
            console.error("Storage verification failed");
            setError("Browser storage issue detected. Please check settings.");
            return;
          }

          console.log("Auth data stored successfully:", {
            token: token.substring(0, 10) + "...", // Only log part of the token for security
            userId,
            role: role || "client",
          });

          // Navigate programmatically instead of using window.location
          navigate("/Acceuil");
        } catch (storageError) {
          console.error("localStorage error:", storageError);
          setError(
            "Could not store login data. Please check browser settings."
          );
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/assets/images/logo.png" alt="Logo" className="logo" />
        <h1 className="login-title">Welcome!</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              className="form-input"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              className="form-checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="remember-me-label">
              Remember me
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="login-button">
              Login
              
            </button>
          </div>
          <div className="text-center">
            <a href="#" className="forgot-password">
              Forget Password?
            </a>
          </div>
        </form>
        <p className="register-link">
          Don't have an Account?{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
