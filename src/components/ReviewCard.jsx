import React from 'react';

const RATING_TEXTS = {
  1: 'Needs Improvement',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Outstanding'
};

export default function ReviewCard({ review, index }) {
  const { judgeName, rating, review: feedbackText, formattedDate, createdAt } = review;
  const initial = judgeName ? judgeName.trim().charAt(0).toUpperCase() : 'J';
  const displayRating = Number(rating) || 5;

  return (
    <article 
      className="review-card" 
      style={{ animationDelay: `${Math.min(index * 60, 400)}ms` }}
    >
      {/* Corner cyber decorations */}
      <div className="card-bracket bracket-tl" />
      <div className="card-bracket bracket-tr" />
      <div className="card-bracket bracket-bl" />
      <div className="card-bracket bracket-br" />

      {/* Top Header of Card: Avatar + Judge Badge */}
      <div className="review-card-top">
        <div className="judge-avatar-group">
          <div className="avatar-frame">
            <span className="avatar-letter">{initial}</span>
            <span className="avatar-glow-ring" />
          </div>
          <div className="judge-meta-text">
            <span className="judge-role-badge">OFFICIAL EVALUATOR</span>
          </div>
        </div>

        <div className="card-judge-pill">
          <span className="pill-dot" />
          <span className="pill-text">JUDGE</span>
        </div>
      </div>

      {/* Judge Name */}
      <div className="review-card-title-row">
        <h4 className="judge-fullname">{judgeName}</h4>
      </div>

      {/* Star Rating Display */}
      <div className="review-card-stars-row">
        <div className="stars-render">
          {[1, 2, 3, 4, 5].map((s) => (
            <span 
              key={s} 
              className={`review-star ${s <= displayRating ? 'star-gold' : 'star-dim'}`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="review-rating-label">
          {displayRating}/5 <span className="label-sub">• {RATING_TEXTS[displayRating] || 'Rated'}</span>
        </span>
      </div>

      {/* Written Feedback Body */}
      <div className="review-card-quote">
        <span className="quote-mark">“</span>
        <p className="feedback-text">{feedbackText}</p>
        <span className="quote-mark end">”</span>
      </div>

      {/* Card Footer: Timestamp */}
      <div className="review-card-footer">
        <div className="timestamp-wrapper">
          <svg className="clock-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <time dateTime={createdAt} className="timestamp-text">
            {formattedDate || 'Recently submitted'}
          </time>
        </div>
        <div className="eval-verified-tag">
          <span>VERIFIED ENTRY</span>
        </div>
      </div>
    </article>
  );
}
