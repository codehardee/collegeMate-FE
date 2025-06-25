import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { getAccessToken, clearTokens } from "../authHelpers";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('access_token');

  const handleLogout = () => {
    if (!token) {
      alert("⚠️ You are not logged in.");
      return;
    }

    clearTokens();
    alert("✅ Logged out!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">College Mate</div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link></li>
        <li><Link to="/blogs" onClick={() => setMenuOpen(false)}>Blog</Link></li>
        <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Your Profile</Link></li>

        {token ? (
          <li>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
