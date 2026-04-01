import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setProfileOpen(false);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">✦</span>
          <span className="brand-text">BlogSphere</span>
        </Link>

        {user && (
          <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
            <Link
              to="/dashboard"
              className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/dashboard"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Bookmarks
            </Link>
            <button className="nav-link logout-mobile" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        <div className="navbar-actions">
          {user ? (
            <div className="profile-wrapper">
              <button className="profile-btn" onClick={toggleProfile}>
                <div className="profile-avatar">{user.avatar}</div>
                <span className="profile-name">{user.name}</span>
                <span className="profile-arrow">▾</span>
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">{user.avatar}</div>
                    <div className="dropdown-info">
                      <span className="dropdown-name">{user.name}</span>
                      <span className="dropdown-email">{user.email}</span>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item">
                    <span>👤</span> My Profile
                  </button>
                  <button className="dropdown-item">
                    <span>⚙️</span> Settings
                  </button>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    <span>🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">
                Sign In
              </Link>
              <Link to="/register" className="btn-register">
                Sign Up
              </Link>
            </div>
          )}

          {user && (
            <button className="hamburger" onClick={toggleMenu}>
              <span className={`bar ${menuOpen ? "open" : ""}`}></span>
              <span className={`bar ${menuOpen ? "open" : ""}`}></span>
              <span className={`bar ${menuOpen ? "open" : ""}`}></span>
            </button>
          )}
        </div>
      </div>

      {profileOpen && (
        <div className="overlay" onClick={() => setProfileOpen(false)}></div>
      )}
    </nav>
  );
};

export default Navbar;
