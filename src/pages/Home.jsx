import React from "react";
import Navbar from "../components/NavBar";
import "./Home.css";
import CategoryGrid from "../components/CategoryGrid";
import BackgroundSection from "../components/BackgroundSection";


import withAuth from '../withAuth';

const Home = () => {
  return (
    <div className="home">
      {/* <Navbar /> */}
      <header className="hero">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <h1>Find or Post College Projects Easily</h1>
        <p>Connecting seniors with juniors for project collaborations.</p>
        <button>Get Started</button>
      </header>

    <section className="how-it-works">
        <h2 className="title">How It Works</h2>
        <p className="description">
          College Mate helps students find and collaborate on projects effortlessly.
        </p>  
        <div className="steps">
          <div className="step">
            <h3>🔍 Browse Projects</h3>
            <p>Explore various projects posted by seniors.</p>
          </div>
          <div className="step">
            <h3>💡 Post a Project</h3>
            <p>Seniors can post projects with requirements.</p>
          </div>
          <div className="step">
            <h3>🤝 Bid & Collaborate</h3>
            <p>Juniors bid on projects and collaborate.</p>
          </div>
        </div>
        
      </section>


      {/* <section className="featured-projects">
        <h2>Featured Projects</h2>
        <div className="project-list">
          <div className="project">Web Development for College</div>
          <div className="project">AI Research Collaboration</div>
          <div className="project">Mobile App for Students</div>
        </div>
      </section> */}

      <section className="info-box">
        <div className="box">
          <h2>We connect people to <br/> bring projects to life</h2>
          <p>Find high-quality talent or open jobs<br /> with the help of AI tools that keep you in control.</p>
          <div className="images">
            <div className="left-side">
              <img src="cm1.jpg" alt="Image 1" />
              <img src="cm2.png" alt="Image 2" />
              <img src="cm3.png" alt="Image 3" />
            </div>
            <div className="right-side">
              <img src="cm4.png" alt="Image 4" />
              <img src="cm5.png" alt="Image 5" />
              <img src="cm6.png" alt="Image 6" />
            </div>
          </div>
          <div className="changing-text">
            <p>UI / UX Projects</p>
            <p>Frontend and Backend</p>
            <p>Fullstack Projects</p>
            <p>Graphic Designing Projects</p>
            <p>CMS & Social Media Marketing</p>
          </div>
        </div>
      </section>

      <section className="image-text-section">
        <div className="image-container">
          <img src="cm1.jpg" alt="Visual" />
        </div>
        <div className="text-container">
          <h2>Up your work game, it’s easy</h2>

          <h3>🆓 No cost to join</h3>
          <p>
          Register and browse talent profiles, <br /> explore projects, or even book a consultation.
          </p>

          <h3>📢 Post a job and hire top talent</h3>
          <p>
          Finding talent doesn’t have to be a chore. Post a job or we can search for you!
          </p>

          <h3>💼 Work with the best—without breaking the bank</h3>
          <p>
          Upwork makes it affordable to up your work and take advantage of low transaction rates.
          </p>

          <div className="button-group">
            <button className="btn-primary">Get Started</button>
            <button className="btn-outline">Learn More</button>
          </div>

        </div>
      </section>


      <CategoryGrid />
      <BackgroundSection />



      <footer className="footer">
        <p>© 2025 College Mate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
