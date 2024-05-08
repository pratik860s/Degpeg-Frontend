// Importing necessary modules from React and React Router
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../../src/degpeg.jpeg"
// Importing the CSS stylesheet for styling the component
import "./Login.css";

// Login component definition
const Login = () => {
  // State hooks for managing email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Event handler for form submission
  const handleSubmit = (event) => {
    // Prevents the default form submission action
    event.preventDefault();
  };

  // JSX for rendering the login form
  return (
    <div className="login-container">
      <div className="login-poster">
      <img className="login-image" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${process.env.PUBLIC_URL}/images/login-poster.png)` }} src={process.env.PUBLIC_URL + "/images/login-poster.png"} alt="My Image" />
          <h1 className="h1-login">Welcome</h1>
          <p className="paragraph">
          Lorem ipsum dolor sit amet,
          consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
          </p>
      </div>
      <div className="login-card">
        {/* <img src={logoImage} alt="Logo" className="logo" /> */}
        {/* Form element with an onSubmit event handler */}
        <form onSubmit={handleSubmit}>
          <h1>Log In</h1>
          {/* Email input field */}
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password input field */}
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Login button */}
          <button className="buttons" type="submit">
            Login
          </button>
          {/* Links for navigating to user or expert registration */}
          <p>
            Register as
            <Link className="link" to="/register/user">
              {" "}
              User
            </Link>{" "}
            or{" "}
            <Link className="link" to="/register/expert">
              Expert
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

// Exporting the Login component for use in other parts of the application
export default Login;
