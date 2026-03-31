import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", { email, password });
  };

  return (
    <div className="login-page">
      <div className="glow-orb" />

      <div className="login-card">
        {/* Logo */}
        <div className="brand">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L15.5 8.5L22 9.5L17 14.5L18.5 21L12 17.5L5.5 21L7 14.5L2 9.5L8.5 8.5L12 2Z"
                stroke="url(#starGrad)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="url(#starFill)"
              />
              <defs>
                <linearGradient id="starGrad" x1="2" y1="2" x2="22" y2="22">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
                <linearGradient id="starFill" x1="2" y1="2" x2="22" y2="22">
                  <stop offset="0%" stopColor="#38bdf820" />
                  <stop offset="100%" stopColor="#818cf820" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="brand-name">IdeonixAI</span>
        </div>

        <h1 className="login-title">Welcome back</h1>
        <p className="login-sub">Sign in to your account to continue</p>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email */}
          <div className={`field-group ${focused === "email" ? "active" : ""}`}>
            <label className="field-label">Email address</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </span>
              <input
                type="email"
                className="field-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className={`field-group ${focused === "password" ? "active" : ""}`}>
            <label className="field-label">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="field-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
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

          <div className="forgot-row">
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="submit-btn">
            <span>Sign In</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <a href="#" className="signup-link">Get Started</a>
        </p>
      </div>
    </div>
  );
}