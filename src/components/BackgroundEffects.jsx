import React from 'react';

export default function BackgroundEffects() {
  return (
    <div className="cyber-bg-wrapper" aria-hidden="true">
      {/* Deep dark gradient overlay */}
      <div className="cyber-bg-gradient" />
      
      {/* Ambient Red Glow Lights */}
      <div className="cyber-glow-blob blob-top-left" />
      <div className="cyber-glow-blob blob-top-right" />
      <div className="cyber-glow-blob blob-center" />
      
      {/* Perspective Cyber Grid */}
      <div className="cyber-grid" />
      
      {/* Floating Cyber Hexagons / Geometric lines */}
      <div className="cyber-geo-layer">
        <span className="geo-shape geo-1" />
        <span className="geo-shape geo-2" />
        <span className="geo-shape geo-3" />
        <span className="geo-shape geo-4" />
      </div>

      {/* Subtle Scanline Overlay */}
      <div className="cyber-scanlines" />
    </div>
  );
}
