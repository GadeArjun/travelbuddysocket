import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-heading">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Reach out to us anytime.</p>
      </div>
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Have questions, suggestions, or feedback? Feel free to drop us an
            email or connect with us through our social media channels.
          </p>
          <p>
            Email:{" "}
            <a href="mailto:travelbuddy@gmail.com">travelbuddy@gmail.com</a>
          </p>
        </div>
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
