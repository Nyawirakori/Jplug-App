import React from "react";
import { NavLink } from "react-router-dom";
import "./Hero.css"; 

function Hero(){
  return (
    <div className="hero-section d-flex align-items-center justify-content-center text-white text-center">
      <div className="hero-content">
        <h1 className="display-4 fw-bold">
          Find Trusted Electricians & Plumbers
        </h1>
        <p className="lead">
          Book a professional service provider in your county today.
        </p>
        <NavLink to="/book" className="btn btn-primary btn-lg mt-3">
          Get Started
        </NavLink>
      </div>
    </div>
  );
};

export default Hero;
