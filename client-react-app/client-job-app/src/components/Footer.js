// Footer.js

import React from "react";
import { FaLinkedin, FaGithub, FaMedium } from "react-icons/fa";
import "./Footer.css";

const socialMediaLinks = [
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/tanerozer16/" },
  { icon: <FaGithub />, url: "https://github.com/dxtaner" },
  { icon: <FaMedium />, url: "https://medium.com/@dxtaner" },
];

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="social-media-links">
        {socialMediaLinks.map((socialMedia, index) => (
          <a
            key={index}
            href={socialMedia.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link">
            {socialMedia.icon}
            <span className="link-label">
              {socialMedia.url.includes("linkedin")
                ? "LinkedIn"
                : socialMedia.url.includes("github")
                ? "GitHub"
                : "Medium"}
            </span>
          </a>
        ))}
      </div>
      <div className="year">© 2023 Jobs App</div>
    </footer>
  );
};

export default Footer;
