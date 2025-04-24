import React, { useState } from "react";
import {
  FaHome,
  FaCalendarAlt,
  FaCog,
  FaFileAlt,
  FaSignOutAlt,
  FaUser,
  FaStar,
} from "react-icons/fa";
import { FaChartPie, FaMessage } from "react-icons/fa6";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const mainMenuItems = [
    { icon: <FaHome />, name: "Dashboard", path: "/serviceProviderDashboard" },
    { icon: <FaFileAlt />, name: "Requests", path: "/requests" },
    { icon: <FaCalendarAlt />, name: "Calendar", path: "/calendar" },
    { icon: <FaUser />, name: "Profile", path: "/serviceProviderProfile" },
    { icon: <FaStar />, name: "Reviews", path: "/reviews" },
  ];

  const outilsMenuItems = [
    { icon: <FaMessage />, name: "Messages", path: "/messages" },
    { icon: <FaChartPie />, name: "Statistics", path: "/statistics" },
    { icon: <FaCog />, name: "Settings", path: "/settings" },
  ];

  const bottomMenuItems = [
    { icon: <FaSignOutAlt />, name: "Logout", path: "/logout" },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="logo-container">
          <img
            src="/assets/images/logo.png"
            alt="ServiceProvider Logo"
            className="logo-img"
          />
          {!isCollapsed && <span className="logo-text">ServiceProvider</span>}
        </div>
        <button
          className="toggle-btn"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {/* Main Menu */}
        <ul className="nav-list main-nav">
          {mainMenuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link to={item.path} className="nav-link">
                <span className="icon">{item.icon}</span>
                {!isCollapsed && <span className="item-text">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Tools Section */}
        {!isCollapsed && (
          <>
            <hr className="separator" />
            <h4 className="nav-heading">Tools</h4>
          </>
        )}
        <ul className="nav-list outils-nav">
          {outilsMenuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link to={item.path} className="nav-link">
                <span className="icon">{item.icon}</span>
                {!isCollapsed && <span className="item-text">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom Section */}
        <div className="bottom-section">
          {!isCollapsed && <hr className="separator" />}
          <ul className="nav-list bottom-nav">
            {bottomMenuItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link to={item.path} className="nav-link">
                  <span className="icon">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="item-text">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
