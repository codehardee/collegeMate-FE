import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProjectPage.css';
import Navbar from "../components/NavBar";
import withAuth from '../withAuth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectPage = ({ isAuthenticated }) => {
  const [projects, setProjects] = useState([]);
  const [expandedProjects, setExpandedProjects] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    skills: '',
    scope: '',
    price: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const token = isAuthenticated ? localStorage.getItem('accessToken') : null;

  console.log("authneticated or not", isAuthenticated)

  console.log("local storage data", localStorage)

  console.log("token.....................", localStorage.getItem('accessToken'))
   
  console.log("🛂 Access Token used:", token);
  // ✅ Fetch projects on load
  useEffect(() => {
    // const token = isAuthenticated ? localStorage.getItem('access_token') : null;
    // if (!token) {
    //   console.log("⚠️ No token found. Skipping project fetch.");
    //   return;
    // }
    // console.log("🛂 Access Token used:", token);
    const token = isAuthenticated ? localStorage.getItem('accessToken') : null;

    console.log("🛂 Token being used:", token);

    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    fetch(`${BASE_URL}/api/uploadProject/projects/`, {
      headers: headers,
    })
      .then(res => res.json())
      .then(data => {
        console.log("📦 Projects received from backend:", data),
        setProjects(data)})
      .catch(err => console.error("Error fetching projects:",err));
  }, [isAuthenticated]);

  // ✅ Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/uploadProject/projects/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setProjects([...projects, data]);
      setShowPostModal(false);
      alert('Project posted successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="projects-page">
        <h1 className="page-title">📂 Projects</h1>

        {/* 🔐 Post button or login prompt */}
        {isAuthenticated ? (
          <button className="post-project-button" onClick={() => setShowPostModal(true)}>
            + Post New Project
          </button>
        ) : (
          <p style={{ fontStyle: 'italic', color: 'gray' }}>
            🔒 Log in to post a new project
          </p>
        )}

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>
                {expandedProjects.includes(project.id)
                  ? project.description
                  : `${project.description.slice(0, 150)}...`}
              </p>

              <div className="button-group">
                <Link to={`/projects/${project.id}`} className="btn">
                  View Details
                </Link>

                {/* 🔐 Bid button */}
                {isAuthenticated ? (
                  <Link to={`/bid?project_id=${project.id}`} className="btn btn-outline">
                    Bid Now
                  </Link>
                ) : (
                  <button className="btn btn-outline" disabled title="Login to bid">
                    Bid Now 🔒
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔐 Modal to post new project */}
      {isAuthenticated && showPostModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowPostModal(false)}>✖</button>
            <h2>🚀 Post a New Project</h2>

            <form onSubmit={handleSubmit}>
              <input type="text" name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} required />
              <input type="text" name="skills" placeholder="Skills (e.g. Python, Django)" value={formData.skills} onChange={handleChange} required />
              <select name="scope" value={formData.scope} onChange={handleChange} required>
                <option value="">Select Scope</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
              <select name="price" value={formData.price} onChange={handleChange} required>
                <option value="">Select Price Type</option>
                <option value="fixed">Fixed</option>
                <option value="hourly">Hourly</option>
              </select>
              <textarea name="description" placeholder="Project Description" value={formData.description} onChange={handleChange} required />

              <button type="submit" className="submit-button">Submit</button>
            </form>

            {error && (
              <div className="error-message">
                <h2>Error:</h2>
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(ProjectPage);
