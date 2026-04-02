import { useState } from "react";
import "./Signup.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup-page">
      <div className="signup-glow-orb" />

      <div className="signup-card">

        {/* ── Logo ── */}
        <div className="signup-brand">
          <div className="signup-brand-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="url(#signupIconFill)"
                stroke="url(#signupIconStroke)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="signupIconFill" x1="2" y1="2" x2="22" y2="22">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="signupIconStroke" x1="2" y1="2" x2="22" y2="22">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="signup-brand-name">IdeonixAI</span>
        </div>

        {/* ── Heading ── */}
        <h1 className="signup-title">Create your account</h1>
        <p className="signup-sub">Start building your fundable startup today</p>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="signup-form">

          {/* Full Name */}
          <div className={`signup-field ${focused === "name" ? "active" : ""}`}>
            <label className="signup-label">Full Name</label>
            <div className="signup-input-wrapper">
              <span className="signup-input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4 21v-1a8 8 0 0116 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                type="text"
                className="signup-input"
                placeholder="John Doe"
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused("")}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className={`signup-field ${focused === "email" ? "active" : ""}`}>
            <label className="signup-label">Email address</label>
            <div className="signup-input-wrapper">
              <span className="signup-input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </span>
              <input
                type="email"
                className="signup-input"
                placeholder="you@example.com"
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className={`signup-field ${focused === "password" ? "active" : ""}`}>
            <label className="signup-label">Password</label>
            <div className="signup-input-wrapper">
              <span className="signup-input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="signup-input"
                placeholder="••••••••"
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                required
              />
              <button type="button" className="signup-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className={`signup-field ${focused === "confirm" ? "active" : ""}`}>
            <label className="signup-label">Confirm Password</label>
            <div className="signup-input-wrapper">
              <span className="signup-input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                className="signup-input"
                placeholder="••••••••"
                onFocus={() => setFocused("confirm")}
                onBlur={() => setFocused("")}
                required
              />
              <button type="button" className="signup-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="signup-btn">
            <span>Get Started</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        {/* ── Login Link ── */}
        <p className="signup-login-text">
          Already have an account?{" "}
          <a href="/login" className="signup-login-link">Sign In</a>
        </p>

      </div>
    </div>
  );
}