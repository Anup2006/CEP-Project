import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import "./Footer.css";

export default function Footer({ onSectionChange }) {
  const quickLinks = [
    { label: "Career Quiz", section: "quiz" },
    { label: "Explore Careers", section: "explore" },
    { label: "Resources", section: "resources" },
    { label: "Contact Us", section: "contact" }
  ];

  const careerCategories = [
    "Engineering & Technology",
    "Medical & Healthcare", 
    "Business & Finance",
    "Arts & Creative",
    "Law & Legal Services",
    "Science & Research"
  ];

  const resources = [
    "Study Materials",
    "Career Videos", 
    "Webinars",
    "Career Tips",
    "Entrance Exam Guides",
    "College Information"
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="company-section">
            <div className="company-logo">
              <GraduationCap className="company-logo-icon" />
              <span className="company-name">CareerCompass</span>
            </div>
            <p className="company-description">
              Empowering students with comprehensive career guidance and 
              personalized recommendations for Classes 10 & 12.
            </p>
            <div className="social-links">
              <button className="social-button">
                <Facebook className="social-icon" />
              </button>
              <button className="social-button">
                <Twitter className="social-icon" />
              </button>
              <button className="social-button">
                <Instagram className="social-icon" />
              </button>
              <button className="social-button">
                <Youtube className="social-icon" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-section-title">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => onSectionChange(link.section)}
                    className="footer-link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Categories */}
          <div className="footer-section">
            <h3 className="footer-section-title">Career Fields</h3>
            <ul className="footer-links">
              {careerCategories.map((category, index) => (
                <li key={index}>
                  <button
                    onClick={() => onSectionChange("explore")}
                    className="footer-link"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h3 className="footer-section-title">Resources</h3>
            <ul className="footer-links">
              {resources.map((resource, index) => (
                <li key={index}>
                  <button
                    onClick={() => onSectionChange("resources")}
                    className="footer-link"
                  >
                    {resource}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-separator"></div>

        {/* Contact Info */}
        <div className="contact-info-section">
          <div className="contact-info-item">
            <Mail className="contact-info-icon" />
            <div className="contact-info-content">
              <p className="contact-info-label">Email Us</p>
              <p className="contact-info-value">support@careercompass.in</p>
            </div>
          </div>
          <div className="contact-info-item">
            <Phone className="contact-info-icon" />
            <div className="contact-info-content">
              <p className="contact-info-label">Call Us</p>
              <p className="contact-info-value">+91 00000 00000</p>
            </div>
          </div>
          <div className="contact-info-item">
            <MapPin className="contact-info-icon" />
            <div className="contact-info-content">
              <p className="contact-info-label">Visit Us</p>
              <p className="contact-info-value">Delhi, India</p>
            </div>
          </div>
        </div>

        <div className="footer-separator"></div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="copyright">
            © 2025 CareerCompass. All rights reserved.
          </div>
          <div className="footer-legal">
            <button className="legal-link">Privacy Policy</button>
            <button className="legal-link">Terms of Service</button>
            <button className="legal-link">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}