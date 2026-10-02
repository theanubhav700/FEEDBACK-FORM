import React, { useState } from 'react';

const RATING_LABELS = {
  1: 'Needs Improvement',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Outstanding',
};

export default function StarRating({ value, onChange, error }) {
  const [hoverValue, setHoverValue] = useState(0);

  const activeValue = hoverValue || value || 0;

  const handleKeyDown = (starNumber, e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(starNumber);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(5, (value || 0) + 1);
      onChange(next);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      const prev = Math.max(1, (value || 1) - 1);
      onChange(prev);
    }
  };

  return (
    <div className={`star-rating-container ${error ? 'has-error' : ''}`}>
      <div 
        className="stars-wrapper"
        onMouseLeave={() => setHoverValue(0)}
        role="radiogroup"
        aria-label="Star rating out of 5"
      >
        {[1, 2, 3, 4, 5].map((starNum) => {
          const isFilled = starNum <= activeValue;
          const isCurrentHover = starNum === hoverValue;
          const isSelected = starNum === value;

          return (
            <button
              type="button"
              key={starNum}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${starNum} star${starNum > 1 ? 's' : ''}: ${RATING_LABELS[starNum]}`}
              tabIndex={0}
              className={`star-btn ${isFilled ? 'filled' : 'empty'} ${isCurrentHover ? 'hovered' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => onChange(starNum)}
              onMouseEnter={() => setHoverValue(starNum)}
              onFocus={() => setHoverValue(starNum)}
              onBlur={() => setHoverValue(0)}
              onKeyDown={(e) => handleKeyDown(starNum, e)}
            >
              <svg 
                className="star-icon" 
                viewBox="0 0 24 24" 
                fill={isFilled ? 'currentColor' : 'none'}
                stroke="currentColor" 
                strokeWidth="1.5"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Numeric Score and Rating Label */}
      <div className="rating-feedback-display">
        {activeValue > 0 ? (
          <div className="rating-info-tag animate-tag">
            <span className="rating-score-num">{activeValue} / 5</span>
            <span className="rating-separator">•</span>
            <span className="rating-score-text">{RATING_LABELS[activeValue]}</span>
          </div>
        ) : (
          <span className="rating-placeholder-text">Click a star to rate project</span>
        )}
      </div>
    </div>
  );
}
