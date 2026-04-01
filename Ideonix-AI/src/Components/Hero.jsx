import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      {/* Background glow orbs */}
      <div className="hero-glow-center" />
      <div className="hero-glow-left" />

      <div className="hero-content">

        {/* ── Badge ── */}
        <div className="hero-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              stroke="url(#badgeStar)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
            />
            <defs>
              <linearGradient id="badgeStar" x1="2" y1="2" x2="22" y2="22">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
          </svg>
          <span>AI-Powered Startup Intelligence</span>
        </div>

        {/* ── Heading ── */}
        <h1 className="hero-title">
          Turn Your Ideas into<br />
          Fundable Startups
        </h1>

        {/* ── Subheading ── */}
        <p className="hero-sub">
          Validate, build, and scale your startup with AI. Get instant market
          <br />analysis, roadmaps, and connect with investors.
        </p>

        {/* ── Buttons ── */}
        <div className="hero-actions">
          <a href="#" className="btn-primary">
            Validate Your Idea
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#" className="btn-secondary">
            Explore Startups
          </a>
        </div>

      </div>
    </section>
  );
}