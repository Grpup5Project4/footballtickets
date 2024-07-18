// Navbar.jsx

import React, { useState } from 'react';
import '../styles/NavBar.css';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="/">Logo</a>
          </div>
          <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <ul className="menu-items">
              <li className="nav-item">
                <a href="/" className="nav-link">Home</a>
              </li>
              <li className="nav-item">
                <a href="/about" className="nav-link">About</a>
              </li>
              <li className="nav-item">
                <a href="/services" className="nav-link">Services</a>
              </li>
              <li className="nav-item">
                <a href="/contact" className="nav-link">Contact</a>
              </li>
            </ul>
            <div className="login-button">
              <button className="btn-login">Log In</button>
            </div>
          </div>
          <div className="menu-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;