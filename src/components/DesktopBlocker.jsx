import React from 'react';

export default function DesktopBlocker() {
  return (
    <div className="desktop-security-blocker" role="alert" aria-live="assertive">
      {/* Background Cyber Matrix Grid */}
      <div className="blocker-backdrop-grid" />
      <div className="blocker-ambient-glow" />

      <div className="blocker-card-container">

        {/* Security Lock Graphic */}
        <div className="blocker-icon-container">
          <div className="blocker-lock-visual">
            <svg
              className="lock-svg"
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF0055"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        {/* Text Details */}
        <h1 className="blocker-title">
          MOBILE DEVICE ONLY
        </h1>
      </div>
    </div>
  );
}
