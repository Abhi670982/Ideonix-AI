import { useState } from "react";
import "./Header.css";
  import logo from "../assets/logo.png";

const navLinks = ["Home", "Validator", "Roadmap", "Investors", "Dashboard"];

export default function Header() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">

        {/* ── Brand ── */}
        <div className="brand">
          <span className="brand-name">IdeonixAI</span>
        </div>

        {/* ── Nav ── */}
        <nav className={`nav ${menuOpen ? "nav--open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className={`nav-link ${active === link ? "nav-link--active" : ""}`}
              onClick={(e) => { e.preventDefault(); setActive(link); setMenuOpen(false); }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* ── Actions ── */}
        <div className="header-actions">
          <a href="#" className="btn-login">Login</a>
          <a href="#" className="btn-started">Get Started</a>
        </div>

        {/* ── Hamburger (mobile) ── */}
        <button
          className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

      </div>
    </header>
  );
}