// Importing necessary modules from React and React Router
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Importing the CSS stylesheet for styling the component
import "./Login.css"

// Login component definition
const Login = () => {
  // State hooks for managing email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Event handler for form submission
  const handleSubmit = (event) => {
    // Prevents the default form submission action
    event.preventDefault();
  };

  // JSX for rendering the login form
  return (
    <div className="login-container">
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
        <button className='buttons' type="submit">Login</button>
        {/* Links for navigating to user or expert registration */}
        <p>
          Register as 
          <Link className="link" to="/register/user"> User</Link> or{' '}
          <Link className="link" to="/register/expert">Expert</Link>
        </p>
      </form>
    </div>
  );
};

// Exporting the Login component for use in other parts of the application
export default Login;
