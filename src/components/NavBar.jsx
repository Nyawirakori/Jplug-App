import { NavLink } from "react-router-dom";
import React from "react";

export default function NavBar({ darkMode, setDarkMode }) {
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <nav
      className={`navbar navbar-expand-sm ${
        darkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"
      }`}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left Side - JPLUG App */}
        <div className="fw-bold text-primary">JPLUG App</div>

        {/* Right Side - NavLinks and Button */}
        <div className="d-flex align-items-center gap-3">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink
            to="/book"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Book
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Contact us
          </NavLink>
          <button className="btn btn-primary" onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}
