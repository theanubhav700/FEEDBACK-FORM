import React from 'react';

export default function BackgroundEffects() {
  return (
    <div className="cyber-bg-wrapper" aria-hidden="true">
      {/* Pure Total Dark Black Background */}
      <div className="cyber-bg-gradient" />
      
      {/* Soft Ambient Spotify Green Glows (No lines) */}
      <div className="cyber-glow-blob blob-top-left" />
      <div className="cyber-glow-blob blob-top-right" />
    </div>
  );
}
