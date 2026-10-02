import React from 'react';

export default function SuccessMessage({ judgeName, onReset }) {
  return (
    <div className="success-card-wrapper animate-success-enter">
      <div className="success-badge-glow" />
      
      {/* Animated Cyber Checkmark Icon */}
      <div className="success-icon-container">
        <svg className="success-check-svg" viewBox="0 0 52 52">
          <circle className="success-circle" cx="26" cy="26" r="24" fill="none" />
          <path className="success-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
      </div>

      <div className="success-header-row">
        <span className="success-system-tag">TRANSMISSION CONFIRMED</span>
      </div>

      <h2 className="success-title">✓ FEEDBACK RECEIVED</h2>
      
      <p className="success-thankyou">
        Thank you, <span className="highlight-judge-name">{judgeName}</span>.
      </p>

      <p className="success-desc">
        Your feedback has been securely saved.
      </p>

      <div className="success-meta-box">
        <div className="meta-item">
          <span className="meta-icon">⚡</span>
          <span>PERSISTED TO TERMINAL STORAGE</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">🛡️</span>
          <span>TEAM HEXA • IDC HACKATHON 3.O</span>
        </div>
      </div>

      <button 
        type="button" 
        onClick={onReset} 
        className="reset-form-btn"
      >
        <span>SUBMIT ANOTHER FEEDBACK</span>
        <span className="btn-arrow">→</span>
      </button>
    </div>
  );
}
