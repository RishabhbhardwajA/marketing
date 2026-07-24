"use client";
import { useState, useEffect } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header" id="site-header">
      <nav className="nav-container" aria-label="Main navigation">
        <a href="#" className="logo" aria-label="NorthPeak Digital home" onClick={closeMenu}>
          <span className="logo-icon">▲</span> NorthPeak
        </a>
        <button
          className="nav-toggle"
          id="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="hamburger"></span>
        </button>
        <ul className={`nav-links ${isOpen ? "open" : ""}`} id="nav-links" role="list">
          <li>
            <a href="#services" className="ai-hover-target" onClick={closeMenu}>
              Services
            </a>
          </li>
          <li>
            <a href="#results" className="ai-hover-target" onClick={closeMenu}>
              Results
            </a>
          </li>
          <li>
            <a href="#pricing" className="ai-hover-target" onClick={closeMenu}>
              Pricing
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-cta" onClick={closeMenu}>
              Get a Free Audit
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
