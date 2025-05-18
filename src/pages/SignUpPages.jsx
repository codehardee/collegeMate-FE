// src/pages/SignUpPage.js

import React, { useState } from 'react';
import './SignUpLoginPage.css';


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    student_id: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  try {
    const res = await fetch(`${BASE_URL}/api/authentication/signup/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error(`Signup failed: ${res.status}`);
    setSuccess('Signup successful! Please log in.');
  } catch (err) {
    setError(err.message);
  }
};


     

  return (
    <div className="form-page-container">
      <h2 className="form-page-title">🚀 Sign Up</h2>
      <form className="form-page-form" onSubmit={handleSubmit}>
        <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input type="text" name="student_id" placeholder="Student ID" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="form-submit-button">Sign Up</button>
      </form>

      {success && (
        <div className="success-message">
          <h2>Success:</h2>
          <p>{success}</p>
        </div>
      )}
      {error && (
        <div className="error-message">
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
