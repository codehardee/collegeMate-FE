import React, { useState } from 'react';
import './BidPage.css';
import Navbar from "../components/NavBar";
// import { AUTH_TOKEN } from '../authToken';
import { useLocation } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BidPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectIdFromURL = queryParams.get('project_id');

  const [formData, setFormData] = useState({
    project: projectIdFromURL || '',
    bid_amount: '',
    student: '',
    message: '',
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null); // added this

  const token = AUTH_TOKEN;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/uploadProject/bids/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
      alert('Bid submitted successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bid-page-wrapper">
        <div className="bid-page-container">
          <h1 className="bid-page-title">💸 Place Your Bid</h1>
          <form onSubmit={handleSubmit} className="bid-form">
            <input
              type="text"
              name="student"
              placeholder="Your Name or ID"
              value={formData.student}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="project"
              placeholder="Project ID"
              value={formData.project}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="bid_amount"
              placeholder="Bid Amount"
              value={formData.bid_amount}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Why should they pick you?"
              value={formData.message}
              onChange={handleChange}
            />
            <button type="submit" className="bid-submit-button">Submit Bid</button>
          </form>
    
          {response && (
            <div className="success-message">
              <h2>Response:</h2>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
    
          {error && (
            <div className="error-message">
              <h2>Error:</h2>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default BidPage;
