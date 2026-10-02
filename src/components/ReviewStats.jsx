import React from 'react';

export default function ReviewStats({ stats }) {
  const { total, average, fiveStarCount, distribution } = stats;

  return (
    <div className="review-stats-card">
      <div className="stats-card-header">
        <div className="stats-header-title-group">
          <span className="stats-icon">📊</span>
          <h3 className="stats-header-title">EVALUATION METRICS</h3>
        </div>
        <span className="stats-live-pill">REAL-TIME</span>
      </div>

      {/* Top 3 Stat metric tiles */}
      <div className="stats-metrics-grid">
        {/* Metric 1: Total Reviews */}
        <div className="metric-tile">
          <div className="metric-label">TOTAL REVIEWS</div>
          <div className="metric-val-row">
            <span className="metric-value-number" id="stats-total-reviews">{total}</span>
            <span className="metric-unit">ENTRIES</span>
          </div>
          <div className="metric-subtext">Verified judge submissions</div>
        </div>

        {/* Metric 2: Average Rating */}
        <div className="metric-tile highlight-tile">
          <div className="metric-label">AVERAGE RATING</div>
          <div className="metric-val-row">
            <span className="metric-value-number rating-highlight" id="stats-average-rating">{average}</span>
            <span className="metric-slash">/</span>
            <span className="metric-max">5</span>
          </div>
          <div className="metric-stars-mini">
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star} 
                className={`mini-star ${star <= Math.round(Number(average)) ? 'filled' : 'empty'}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Metric 3: 5-Star Reviews */}
        <div className="metric-tile">
          <div className="metric-label">5 STAR REVIEWS</div>
          <div className="metric-val-row">
            <span className="metric-value-number" id="stats-five-star-count">{fiveStarCount}</span>
            <span className="metric-unit">TOP RATED</span>
          </div>
          <div className="metric-subtext">
            {total > 0 ? `${Math.round((fiveStarCount / total) * 100)}% of total` : 'Awaiting 5★ marks'}
          </div>
        </div>
      </div>

      {/* RATING DISTRIBUTION SECTION */}
      <div className="distribution-section">
        <div className="distribution-heading-row">
          <span className="distribution-heading">RATING DISTRIBUTION</span>
          <span className="distribution-legend">PERCENTAGE & COUNT</span>
        </div>

        <div className="distribution-list">
          {distribution.map(({ star, count, percentage }) => (
            <div key={star} className="distribution-row">
              {/* Star Label: e.g. ★★★★★ */}
              <div className="dist-star-label" title={`${star} stars`}>
                <span className="dist-star-num">{star}</span>
                <span className="dist-star-glyph">★</span>
              </div>

              {/* Progress Track & Bar */}
              <div className="dist-bar-track">
                <div 
                  className={`dist-bar-fill star-tier-${star}`}
                  style={{ width: `${total > 0 ? Math.max(percentage, 2) : 0}%` }}
                />
              </div>

              {/* Percentage & Count */}
              <div className="dist-count-col">
                <span className="dist-count-num">{count}</span>
                <span className="dist-percentage">({percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
