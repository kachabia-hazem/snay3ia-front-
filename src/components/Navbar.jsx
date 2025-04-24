import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Example user profile image (replace with actual user data)
  const userProfileImage = "/assets/images/img.avif"; // Placeholder image

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="nav-content">
          {/* Logo */}
          <Link to="/" className="logo-container">
            <img src="/assets/images/logo.png" alt="Logo" className="logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            {[
              { path: "/", label: "Accueil" },
              { path: "/populaire", label: "Populaire" },
              { path: "/comment-ca-marche", label: "Comment ca marche" },
              { path: "/trouver-un-artisan", label: "Trouver un artisan" },
            ].map((item) => (
              <Link key={item.path} to={item.path} className="nav-link">
                {item.label}
              </Link>
            ))}
            <div className="auth-buttons">
              <Link to="/login" className="auth-button login-btn">
                Connexion
              </Link>
              <Link to="/espace-artisan" className="auth-button join-btn">
                Espace artisan
              </Link>
              <Link to="/contactez-nous" className="auth-button connect-btn">
                Contactez-nous
              </Link>
              {/* User Profile Icon */}
              <Link to="/profile" className="user-profile">
                <img
                  src={userProfileImage}
                  alt="User Profile"
                  className="user-profile-img"
                />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-btn">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="menu-toggle"
            >
              {menuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            {[
              { path: "/", label: "Accueil" },
              { path: "/populaire", label: "Populaire" },
              { path: "/comment-ca-marche", label: "Comment ça marche" },
              { path: "/trouver-un-artisan", label: "Trouver un artisan" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mobile-auth-buttons">
              <Link
                to="/login"
                className="mobile-auth-button mobile-login-btn"
                onClick={() => setMenuOpen(false)}
              >
                Connexion
              </Link>
              <Link
                to="/espace-artisan"
                className="mobile-auth-button mobile-join-btn"
                onClick={() => setMenuOpen(false)}
              >
                Espace artisan
              </Link>
              <Link
                to="/contactez-nous"
                className="mobile-auth-button mobile-connect-btn"
                onClick={() => setMenuOpen(false)}
              >
                Contactez-nous
              </Link>
              {/* Mobile User Profile Icon */}
              <Link
                to="/profile"
                className="mobile-user-profile"
                onClick={() => setMenuOpen(false)}
              >
                <br />
                <img
                  src={userProfileImage}
                  alt="User Profile"
                  className="mobile-user-profile-img"
                />
                Profil
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Base Styles */
        .navbar-container {
          font-family: Arial, sans-serif;
        }

        /* Navbar */
        .navbar {
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 50;
          padding: 1rem 0;
        }

        .nav-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .logo-container {
          text-decoration: none;
          display: flex;
          flex-direction: column;
        }

        .logo-title {
          font-size: 2rem;
          font-weight: bold;
          color: #2d3748;
          letter-spacing: 1px;
        }

        .logo-subtitle {
          font-size: 1rem;
          color: #4a5568;
          margin-top: 0.25rem;
        }

        /* Desktop Menu */
        .desktop-menu {
          display: none;
          align-items: center;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .desktop-menu {
            display: flex;
          }
        }

        .nav-link {
          color: #2d3748;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 0.5rem 0;
          position: relative;
        }

        .nav-link:hover {
          color: #2d3748;
        }

        .nav-link:hover::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #4299e1;
          animation: underline 0.3s ease;
        }

        @keyframes underline {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .auth-buttons {
          display: flex;
          gap: 1rem;
          margin-left: 1rem;
          align-items: center;
        }

        .auth-button {
          padding: 0.5rem 1.25rem;
          border-radius: 0.375rem;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s;
        }

        .login-btn {
          background-color: #2d3748;
          color: white;
          border: 2px solid #2d3748;
        }

        .login-btn:hover {
          background-color: #1a202c;
          transform: translateY(-2px);
        }

        .connect-btn {
          background-color: #ffffff;
          color: #2d3748;
          border: 2px solid #2d3748;
        }

        .connect-btn:hover {
          background-color: #f7fafc;
          transform: translateY(-2px);
        }

        .join-btn {
          background-color: #4299e1;
          color: white;
          border: 2px solid #4299e1;
        }

        .join-btn:hover {
          background-color: #3182ce;
          transform: translateY(-2px);
        }

        /* User Profile Icon (Desktop) */
        .user-profile {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .user-profile-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e2e8f0;
          transition: all 0.3s;
        }

        .user-profile:hover .user-profile-img {
          transform: scale(1.1);
          border-color: #4299e1;
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: block;
        }

        @media (min-width: 768px) {
          .mobile-menu-btn {
            display: none;
          }
        }

        .menu-toggle {
          color: #2d3748;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .menu-icon {
          width: 1.75rem;
          height: 1.75rem;
        }

        /* Mobile Menu */
        .mobile-menu {
          background-color: #ffffff;
          border-top: 1px solid #e2e8f0;
          padding: 1.5rem 0;
        }

        @media (min-width: 768px) {
          .mobile-menu {
            display: none;
          }
        }

        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .mobile-nav-link {
          color: #2d3748;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 0.5rem 0;
          position: relative;
        }

        .mobile-nav-link:hover {
          color: #2d3748;
        }

        .mobile-nav-link:hover::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #4299e1;
          animation: underline 0.3s ease;
        }

        .mobile-auth-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
          width: 80%;
        }

        .mobile-auth-button {
          padding: 0.75rem;
          border-radius: 0.375rem;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          text-align: center;
          transition: all 0.3s;
        }

        .mobile-login-btn {
          background-color: #2d3748;
          color: white;
          border: 2px solid #2d3748;
        }

        .mobile-connect-btn {
          background-color: #ffffff;
          color: #2d3748;
          border: 2px solid #2d3748;
        }

        .mobile-join-btn {
          background-color: #4299e1;
          color: white;
          border: 2px solid #4299e1;
        }

        /* User Profile Icon (Mobile) */
        .mobile-user-profile {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 0.375rem;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          text-align: center;
          color: #2d3748;
          border: 2px solid #e2e8f0;
          transition: all 0.3s;
        }

        .mobile-user-profile-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e2e8f0;
        }

        .mobile-user-profile:hover {
          background-color: #f7fafc;
          border-color: #4299e1;
        }
      `}</style>
    </div>
  );
};

export default Navbar;