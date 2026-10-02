import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header({ theme = 'dark', onToggleTheme }) {
  return (
    <header className="terminal-header">
      <div className="header-container">
        {/* Brand identity */}
        <div className="brand-group">
          <div className="logo-frame">
            <div className="logo-glow" />
            <img 
              src="/hexa.png" 
              alt="HEXA Logo" 
              className="hexa-logo-img" 
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="logo-tech-corner" />
          </div>
          <div className="brand-titles">
            <div className="brand-primary-row">
              <span className="brand-name">HEXA</span>
              <span className="brand-badge">TEAM TERMINAL</span>
            </div>
            <span className="brand-hackathon">IDC HACKATHON 3.O</span>
          </div>
        </div>

        {/* Right side: Dark / Light Mode Theme Toggle */}
        <div className="header-meta">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
      <div className="header-tech-line" />
    </header>
  );
}
