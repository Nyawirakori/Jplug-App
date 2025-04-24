import "./App.css";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero"; 
import React from "react";
import { useDarkMode } from "./components/DarkModeContext"; 

export default function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> 
      <Hero />
    </div>
  );
}
