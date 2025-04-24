import "./App.css";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero"; 
import React, { useState } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false); // Dark mode

  return (
    <div>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <div className={`container my-4 ${darkMode ? "bg-dark text-white" : ""}`}>
        
      </div>
    </div>
  );
}
