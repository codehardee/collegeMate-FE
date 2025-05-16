import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProjectPage.css';
import Navbar from "../components/NavBar";
import { AUTH_TOKEN } from '../authToken';


const ProjectPage = () => {
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
  const token = AUTH_TOKEN;

  // ✅ Fetch projects on load
  useEffect(() => {
    console.log("🔐 Token being sent:");
    console.log("🔐 Token being sent:", token);
    fetch('http://127.0.0.1:8000/api/uploadProject/projects/', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  // ✅ Toggle Read More / Show Less
  // const toggleReadMore = (projectId) => {
  //   if (expandedProjects.includes(projectId)) {
  //     setExpandedProjects(expandedProjects.filter(id => id !== projectId));
  //   } else {
  //     setExpandedProjects([...expandedProjects, projectId]);
  //   }
  // };

  // ✅ Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/uploadProject/projects/', {
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
        <button className="post-project-button" onClick={() => setShowPostModal(true)}>
          + Post New Project
        </button>

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
                <Link to={`/bid?project_id=${project.id}`} className="btn btn-outline">
                  Bid Now
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

      {showPostModal && (
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

export default ProjectPage;
