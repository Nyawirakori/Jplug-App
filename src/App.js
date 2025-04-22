import "./App.css";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Steps from "./components/Steps";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [darkMode, setDarkMode] = useState(false); // Dark mode

  return (
    <div className={`container my-4 ${darkMode ? "bg-dark text-white" : ""}`}>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Header />
      <Steps />
      <div className="text-center mt-5">
        <Link to="/book" className="btn btn-primary btn-lg">
          Get Started
        </Link>
      </div>
    </div>
  );
}
