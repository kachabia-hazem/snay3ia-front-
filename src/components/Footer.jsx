// Footer.jsx
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaCertificate, FaTools } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>À propos</h3>
          <p>Notre plateforme met en relation clients et artisans qualifiés pour tous vos projets artisanaux.</p>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <address>
            <p><FaPhone className="footer-icon" /> Téléphone: 20200200</p>
            <p><FaMapMarkerAlt className="footer-icon" /> Adresse: Mrezge, Nabeul</p>
            <p><FaEnvelope className="footer-icon" /> Email: contact@artisans.com</p>
          </address>
        </div>
        
        <div className="footer-section">
          <h3>Réseaux sociaux</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <FaFacebookF className="social-icon" />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram className="social-icon" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter className="social-icon" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn className="social-icon" />
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Informations</h3>
          <p><FaClock className="footer-icon" /> Horaires: Lun-Ven 8h-18h</p>
          <p><FaTools className="footer-icon" /> Services professionnels</p>
          <p><FaCertificate className="footer-icon" /> Artisans certifiés</p>
        </div>
      </div>
      
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Plateforme Artisanale. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;