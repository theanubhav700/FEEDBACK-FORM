import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="terminal-footer">
      <div className="footer-container">
        <div className="footer-brand-row">
          <div className="footer-logo-wrap">
            <img 
              src="/feedback-logo.png" 
              alt="Feedback Logo" 
              className="footer-logo-img" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="footer-brand-title">FEEDBACK</span>
          </div>
          <div className="footer-tagline">
            ENGINEERED FOR IDC HACKATHON 3.O
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-meta-row">
          <div className="footer-copy">
            © {currentYear} <span className="highlight-text">TEAM HEXA</span> • Indian Data Club Hackathon 3.O
          </div>
        </div>
      </div>
    </footer>
  );
}
