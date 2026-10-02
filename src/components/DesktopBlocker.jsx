import React, { useState, useEffect } from 'react';

export default function DesktopBlocker() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleCopyLink = () => {
    if (navigator.clipboard && currentUrl) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Safe QR code generator using public API with fallback
  const qrCodeUrl = currentUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
        currentUrl
      )}&color=00F0FF&bgcolor=050505&margin=6`
    : '';

  return (
    <div className="desktop-security-blocker" role="alert" aria-live="assertive">
      {/* Background Cyber Matrix Grid */}
      <div className="blocker-backdrop-grid" />
      <div className="blocker-ambient-glow" />

      <div className="blocker-card-container">
        {/* Terminal Status Bar */}
        <div className="blocker-terminal-header">
          <div className="blocker-header-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-cyan" />
          </div>
          <span className="blocker-header-badge">
            <span className="status-live-blinker" />
            SEC-GUARD // 403-DESKTOP-RESTRICTED
          </span>
          <span className="blocker-timestamp">
            ID: IDC-HEXA-SEC
          </span>
        </div>

        {/* Warning Icon Graphic */}
        <div className="blocker-icon-container">
          <div className="blocker-phone-visual">
            <svg
              className="phone-svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
              <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
              <line x1="9" y1="5" x2="15" y2="5" />
            </svg>
            <div className="blocker-lock-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF0055" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text Details */}
        <h1 className="blocker-title">
          MOBILE DEVICE ONLY
        </h1>
        <p className="blocker-subtitle-hindi">
          यह वेबसाइट केवल मोबाइल स्मार्टफोन पर उपलब्ध है।
        </p>
        <p className="blocker-description">
          Desktop access is restricted by security protocol. Please switch to your smartphone or scan the QR code below to access the evaluation form.
        </p>

        {/* Device Metrics */}
        <div className="blocker-stats-grid">
          <div className="blocker-stat-pill">
            <span className="stat-label">DEVICE STATUS</span>
            <span className="stat-value danger">DESKTOP DETECTED</span>
          </div>
          <div className="blocker-stat-pill">
            <span className="stat-label">VIEWPORT WIDTH</span>
            <span className="stat-value warning">{windowWidth}px (Max: 800px)</span>
          </div>
        </div>

        {/* Mobile Transition Actions (QR & Link) */}
        {qrCodeUrl && (
          <div className="blocker-qr-wrapper">
            <div className="qr-frame">
              <img
                src={qrCodeUrl}
                alt="Scan to open on smartphone"
                className="qr-image"
                loading="eager"
              />
              <span className="qr-scan-line" />
            </div>
            <div className="qr-instructions">
              <span className="qr-hint-title">📱 Scan with Phone Camera</span>
              <p className="qr-hint-sub">Point your smartphone camera at this QR code to immediately launch the evaluation form on mobile.</p>
              
              <button 
                type="button" 
                className="btn-copy-url" 
                onClick={handleCopyLink}
                title="Copy URL"
              >
                {copied ? '✓ URL Copied to Clipboard!' : '📋 Copy Website URL'}
              </button>
            </div>
          </div>
        )}

        <div className="blocker-footer-meta">
          <span>TEAM HEXA • IDC HACKATHON 3.O</span>
          <span className="system-pill">INTEGRITY LOCK ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
