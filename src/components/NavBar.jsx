import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CategoryGrid.css";
import { clearTokens } from "../authHelpers";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    clearTokens();
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">College Mate</div>

      {/* Hamburger icon */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Nav links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link></li>
        <li><Link to="/blogs" onClick={() => setMenuOpen(false)}>Blog</Link></li>
        <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Your Profile</Link></li>
        <li>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
