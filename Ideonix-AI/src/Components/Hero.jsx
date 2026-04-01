import "./Hero.css";

const features = [
  {
    id: 1,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8"/>
        <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1.8" strokeOpacity="0.5"/>
        <circle cx="12" cy="12" r="1.5" fill="white"/>
      </svg>
    ),
    title: "Instant Validation",
    description: "Get AI-powered market analysis, competition insights, and success probability in seconds.",
    active: false,
  },
  {
    id: 2,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
      </svg>
    ),
    title: "Smart Roadmaps",
    description: "Receive personalized step-by-step plans from MVP to scaling, tailored to your industry.",
    active: true,
  },
  {
    id: 3,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="1.8"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Investor Network",
    description: "Connect with relevant investors actively seeking opportunities in your space.",
    active: false,
  },
];

const steps = [
  {
    id: 1,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
      </svg>
    ),
    title: "Submit Your Idea",
    description: "Describe your startup concept and target market",
  },
  {
    id: 2,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="12" width="4" height="8" rx="1" stroke="white" strokeWidth="1.8"/>
        <rect x="10" y="8" width="4" height="12" rx="1" stroke="white" strokeWidth="1.8"/>
        <rect x="17" y="4" width="4" height="16" rx="1" stroke="white" strokeWidth="1.8"/>
      </svg>
    ),
    title: "Get Analysis",
    description: "Receive comprehensive AI validation and insights",
  },
  {
    id: 3,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
      </svg>
    ),
    title: "Follow Roadmap",
    description: "Execute your personalized action plan",
  },
  {
    id: 4,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="16 7 22 7 22 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Connect & Scale",
    description: "Match with investors and grow your startup",
  },
];

const testimonials = [
  {
    id: 1,
    text: "IdeonixAI helped us validate our SaaS idea and secure $2M in seed funding within 3 months.",
    name: "Sarah Chen",
    role: "CEO at TechFlow",
  },
  {
    id: 2,
    text: "The AI roadmap was incredibly detailed. We followed it step-by-step and launched our MVP in 6 weeks.",
    name: "Marcus Rodriguez",
    role: "Founder of FinTrack",
  },
  {
    id: 3,
    text: "Connected with the perfect investor through their marketplace. Game-changing platform for startups.",
    name: "Emily Watson",
    role: "Co-founder at HealthHub",
  },
];

export default function Hero() {
  return (
    <>
      {/* ── 1. Hero Section ── */}
      <section className="hero">
        <div className="hero-glow-center" />
        <div className="hero-glow-left" />
        <div className="hero-content">
          <div className="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke="url(#badgeStar)" strokeWidth="1.5" strokeLinejoin="round" fill="none"
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
          <h1 className="hero-title">
            Turn Your Ideas into<br />Fundable Startups
          </h1>
          <p className="hero-sub">
            Validate, build, and scale your startup with AI. Get instant market
            <br />analysis, roadmaps, and connect with investors.
          </p>
          <div className="hero-actions">
            <a href="#" className="btn-primary">
              Validate Your Idea
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" className="btn-secondary">Explore Startups</a>
          </div>
        </div>
      </section>

      {/* ── 2. Features Section ── */}
      <section className="features">
        <div className="features-header">
          <h2 className="features-title">Everything You Need to Launch</h2>
          <p className="features-sub">AI-powered tools to transform your ideas into successful ventures</p>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.id} className={`feature-card ${f.active ? "feature-card--active" : ""}`}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. How It Works Section ── */}
      <section className="hiw">
        <div className="hiw-header">
          <h2 className="hiw-title">How It Works</h2>
          <p className="hiw-sub">From idea to launch in four simple steps</p>
        </div>
        <div className="hiw-steps">
          {steps.map((step, index) => (
            <div key={step.id} className="hiw-step">
              {/* connector line between steps */}
              {index < steps.length - 1 && <div className="hiw-connector" />}
              <div className="hiw-icon">{step.icon}</div>
              <span className="hiw-number">{step.id}</span>
              <h3 className="hiw-step-title">{step.title}</h3>
              <p className="hiw-step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Testimonials Section ── */}
      <section className="testimonials">
        <div className="testimonials-header">
          <h2 className="testimonials-title">Trusted by Founders</h2>
          <p className="testimonials-sub">Join thousands of entrepreneurs who launched with IdeonixAI</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#38bdf8">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-role">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. CTA Section ── */}
      <section className="cta">
        <div className="cta-box">
          <h2 className="cta-title">Ready to Launch Your Startup?</h2>
          <p className="cta-sub">Join thousands of entrepreneurs building the future</p>
          <a href="#" className="btn-primary">
            Start Validating Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}