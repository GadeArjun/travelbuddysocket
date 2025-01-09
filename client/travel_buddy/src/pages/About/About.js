import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-heading">
        <h1>About Travel Buddy</h1>
        <p>Your ultimate companion for exploring the world</p>
      </div>
      <div className="about-content">
        <div className="about-section">
          <h2>Discover Hidden Gems</h2>
          <p>
            With Travel Buddy, find the best places to visit near your location,
            including popular tourist attractions, hotels, and unique
            experiences. Get detailed information like addresses, contact
            details, and distances.
          </p>
        </div>
        <div className="about-section">
          <h2>Plan Your Journey</h2>
          <p>
            Use our easy-to-navigate platform to calculate distances between
            destinations and find nearby attractions. Whether you're planning a
            solo trip or a group adventure, Travel Buddy has your back.
          </p>
        </div>
        <div className="about-section">
          <h2>Responsive Design</h2>
          <p>
            Our website is fully responsive, ensuring you have a seamless
            experience across all devices. Access Travel Buddy on your laptop,
            tablet, or smartphone without compromising functionality.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
