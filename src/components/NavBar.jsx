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
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Contact us
        </NavLink>

        <button className="btn btn-primary ms-auto" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}
