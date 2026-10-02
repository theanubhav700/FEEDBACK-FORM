import React from 'react';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Large Centered Heading */}
        <h1 className="hero-title">
          <span className="title-highlight">JUDGE</span> FEEDBACK
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Your feedback helps us improve, iterate and build better.
        </p>

        {/* Additional small text */}
        <div className="hero-meta-row">
          <span className="meta-bracket">[</span>
          <span className="meta-team">TEAM HEXA</span>
          <span className="meta-separator">•</span>
          <span className="meta-hackathon">IDC HACKATHON 3.O OFFICIAL REVIEW</span>
          <span className="meta-bracket">]</span>
        </div>
      </div>
    </section>
  );
}
