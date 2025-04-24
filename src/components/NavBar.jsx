import { NavLink } from "react-router-dom";
import React from "react";

export default function NavBar({ darkMode, toggleDarkMode }) {

   const navbarClasses = `navbar sticky-top navbar-expand-lg ${
    darkMode ? "bg-dark text-light navbar-dark" : "bg-light text-dark navbar-light"
  }`;

  return (
     <nav className={navbarClasses}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="fw-bold text-primary">JPLUG App</div>
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
         <div className="ms-auto">
              <button
                id="dark-mode-toggle"
                className="btn btn-outline-none"
                onClick={toggleDarkMode}
              >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          </div>
        </div>
      </div>
    </nav>
  );
}