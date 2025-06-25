import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import './ProjectPage.css'; 
// import { AUTH_TOKEN } from '../authToken';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const token = AUTH_TOKEN;

  useEffect(() => {
    fetch(`${BASE_URL}/api/uploadProject/projects/${id}/`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setProject(data))
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
  if (project) {
    console.log("Project Title:", project.title);
    console.log("Skills Required:", project.skills);
    console.log("Project Scope:", project.scope);
  }
}, [project]);

  if (!project) return <p>Loading project details...</p>;

  return (
    <div>
      <Navbar />
      <div className="projects-page">
        <h1 className="page-title">{project.title}</h1>
        <div className="project-card">
          <h3>{project.title}</h3>
          <p><strong>Skills:</strong> {project.skills}</p>
          <p><strong>Scope:</strong> {project.scope}</p>
          <p><strong>Price:</strong> {project.price}</p>
          <p>{project.description}</p>
          <Link to="/projects" className="btn">Back to Projects</Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
