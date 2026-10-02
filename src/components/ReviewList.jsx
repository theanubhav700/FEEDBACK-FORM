import React from 'react';
import ReviewCard from './ReviewCard';

export default function ReviewList({ reviews = [] }) {
  return (
    <section className="recent-feedback-section" id="recent-feedback">
      {/* Section Header */}
      <div className="section-header-row">
        <div className="section-title-group">
          <div className="section-tag">AUDIT LOG</div>
          <h2 className="section-heading">
            <span className="heading-accent">RECENT</span> FEEDBACK
          </h2>
        </div>

        <div className="section-counter-badge">
          <span className="badge-dot pulse" />
          <span className="badge-count-text">
            {reviews.length} {reviews.length === 1 ? 'EVALUATION' : 'EVALUATIONS'}
          </span>
        </div>
      </div>

      {/* Review list or Empty State */}
      {reviews.length === 0 ? (
        <div className="empty-feedback-state animate-fade-in">
          <div className="empty-radar-icon">
            <div className="radar-sweep" />
            <div className="radar-ring ring-1" />
            <div className="radar-ring ring-2" />
            <div className="radar-ring ring-3" />
            <svg 
              className="radar-center-svg" 
              viewBox="0 0 24 24" 
              width="32" 
              height="32" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <line x1="9" y1="10" x2="15" y2="10" />
            </svg>
          </div>

          <h3 className="empty-title">NO FEEDBACK YET</h3>
          <p className="empty-subtitle">
            Be the first judge to share your feedback.
          </p>

          <div className="empty-hint-tag">
            <span className="hint-arrow">↑</span>
            <span>Use the evaluation form above to submit your review</span>
          </div>
        </div>
      ) : (
        <div className="reviews-grid">
          {reviews.map((item, idx) => (
            <ReviewCard key={item.id || idx} review={item} index={idx} />
          ))}
        </div>
      )}
    </section>
  );
}
