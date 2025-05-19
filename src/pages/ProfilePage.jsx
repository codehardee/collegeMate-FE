import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import Navbar from "../components/NavBar";
import { getAccessToken } from '../authHelpers';


const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const ProfilePage = () => {
  const [formData, setFormData] = useState({
    unique_student_id: '',
    about: '',
    interests: '',
    skills: '',
    education: '',
    social_media: '',
  });

  const [profileId, setProfileId] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const token = getAccessToken();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/userProfile/me/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setUserProfile(data);
        setProfileId(data.id);

        setFormData({
          unique_student_id: data.unique_student_id || '',
          about: data.about || '',
          interests: data.interests || '',
          skills: data.skills || '',
          education: data.education || '',
          social_media: data.social_media || '',
        });
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'profile_picture') setProfilePicture(files[0]);
    if (name === 'portfolio') setPortfolio(files[0]);
    if (name === 'certificate') setCertificate(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    if (profilePicture) form.append('profile_picture', profilePicture);
    if (portfolio) form.append('portfolio', portfolio);
    if (certificate) form.append('certificate', certificate);

    try {
      const res = await fetch(`${BASE_URL}/api/userProfile/profiles/${profileId}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setResponse(data);
      setUserProfile(data);
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">👤 Your Profile</h1>

        {userProfile ? (
          <div className="profile-card">
            <h2>{userProfile.unique_student_id}</h2>
            <p><strong>About:</strong> {userProfile.about}</p>
            <p><strong>Interests:</strong> {userProfile.interests}</p>
            <p><strong>Skills:</strong> {userProfile.skills}</p>
            <p><strong>Education:</strong> {userProfile.education}</p>
            <p><strong>Social Media:</strong> {userProfile.social_media}</p>
            {userProfile.profile_picture && (
              <img
                src={`${BASE_URL}${userProfile.profile_picture}`}
                alt="Profile"
                width="150"
                style={{ marginTop: '10px' }}
              />
            )}
          </div>
        ) : (
          <p>Loading profile...</p>
        )}

        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="unique_student_id" placeholder="Student ID" value={formData.unique_student_id} onChange={handleChange} required />
          <textarea name="about" placeholder="About" value={formData.about} onChange={handleChange} required />
          <input type="text" name="interests" placeholder="Interests" value={formData.interests} onChange={handleChange} required />
          <input type="text" name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} required />
          <input type="text" name="education" placeholder="Education" value={formData.education} onChange={handleChange} required />
          <input type="url" name="social_media" placeholder="Social Media URL" value={formData.social_media} onChange={handleChange} />

          <label>Profile Picture:</label>
          <input type="file" name="profile_picture" accept="image/*" onChange={handleFileChange} />

          <label>Portfolio File:</label>
          <input type="file" name="portfolio" onChange={handleFileChange} />

          <label>Certificate File:</label>
          <input type="file" name="certificate" onChange={handleFileChange} />

          <button type="submit" className="submit-button">Save Profile</button>
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
  );
};

export default ProfilePage;
