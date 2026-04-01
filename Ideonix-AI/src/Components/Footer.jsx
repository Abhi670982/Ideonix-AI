import "./Footer.css";

const footerLinks = {
  Product: ["Validator", "Roadmap", "Dashboard", "Investors"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy", "Terms", "Security"],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* ── Brand Column ── */}
        <div className="footer-brand">
          <div className="footer-brand-row">
            <div className="footer-brand-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="url(#footerIconFill)"
                  stroke="url(#footerIconStroke)"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="footerIconFill" x1="2" y1="2" x2="22" y2="22">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="footerIconStroke" x1="2" y1="2" x2="22" y2="22">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="footer-brand-name">IdeonixAI</span>
          </div>
          <p className="footer-brand-desc">
            AI-powered startup validation and growth platform
          </p>
        </div>

        {/* ── Link Columns ── */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading} className="footer-col">
            <h4 className="footer-col-heading">{heading}</h4>
            <ul className="footer-col-list">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="footer-link">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <p className="footer-copy">© 2026 IdeonixAI. All rights reserved.</p>
      </div>
    </footer>
  );
}