// Footer.jsx

import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <a href="/">Logo</a>
        </div>
        <div className="footer-links">
          <ul className="footer-menu">
            <li className="footer-item">
              <a href="/about" className="footer-link">About Us</a>
            </li>
            <li className="footer-item">
              <a href="/services" className="footer-link">Services</a>
            </li>
            <li className="footer-item">
              <a href="/portfolio" className="footer-link">Portfolio</a>
            </li>
            <li className="footer-item">
              <a href="/contact" className="footer-link">Contact Us</a>
            </li>
            <li className="footer-item">
              <a href="/privacy" className="footer-link">Privacy Policy</a>
            </li>
            <li className="footer-item">
              <a href="/terms" className="footer-link">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
