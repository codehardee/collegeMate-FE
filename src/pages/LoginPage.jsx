// src/pages/LoginPage.js

import React, { useState } from 'react';
import { saveTokens } from '../authHelpers';
import './SignUpLoginPage.css';

import { useNavigate } from 'react-router-dom';



const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const LoginPage = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

  try {
    const res = await fetch(`${BASE_URL}/api/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: studentId, password }),
    });

    if (!res.ok) throw new Error(`Login failed: ${res.status}`);

    const data = await res.json();
    saveTokens(data.access, data.refresh);
    setSuccess('Login successful! You can now navigate to your profile.');

    setTimeout(() => {
      navigate('/');
    }, 1000);

  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="form-page-container">
      <h2 className="form-page-title">🔐 Log In</h2>
      <form className="form-page-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="form-submit-button">Log In</button>
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

export default LoginPage;
