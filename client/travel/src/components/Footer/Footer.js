import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h3 className="footer__title">TravelBuddy</h3>
          <p className="footer__description">
            Your ultimate travel companion to explore, plan, and experience
            unforgettable adventures.
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; 2025 TravelBuddy. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
