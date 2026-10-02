import React, { useState, useEffect, useRef } from 'react';
import StarRating from './StarRating';
import SuccessMessage from './SuccessMessage';

export default function FeedbackForm({ onReviewSubmitted }) {
  const [judgeName, setJudgeName] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedJudgeName, setSubmittedJudgeName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const nameInputRef = useRef(null);
  const resetTimerRef = useRef(null);

  // Character limit constants
  const MIN_NAME_LENGTH = 2;
  const MIN_REVIEW_LENGTH = 10;
  const MAX_REVIEW_LENGTH = 1000;

  // Cleanup auto-reset timer if unmounted
  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    if (field === 'judgeName') {
      if (!value || value.trim().length < MIN_NAME_LENGTH) {
        newErrors.judgeName = 'Please enter your name.';
      } else {
        delete newErrors.judgeName;
      }
    }

    if (field === 'rating') {
      if (!value || value < 1 || value > 5) {
        newErrors.rating = 'Please select a star rating.';
      } else {
        delete newErrors.rating;
      }
    }

    if (field === 'review') {
      const trimmed = value ? value.trim() : '';
      if (!trimmed || trimmed.length < MIN_REVIEW_LENGTH) {
        newErrors.review = `Feedback must be at least ${MIN_REVIEW_LENGTH} characters.`;
      } else if (value.length > MAX_REVIEW_LENGTH) {
        newErrors.review = `Feedback cannot exceed ${MAX_REVIEW_LENGTH} characters.`;
      } else {
        delete newErrors.review;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'judgeName') validateField('judgeName', judgeName);
    if (field === 'rating') validateField('rating', rating);
    if (field === 'review') validateField('review', review);
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setJudgeName(val);
    if (touched.judgeName) {
      validateField('judgeName', val);
    }
  };

  const handleRatingChange = (val) => {
    setRating(val);
    setTouched(prev => ({ ...prev, rating: true }));
    validateField('rating', val);
  };

  const handleReviewChange = (e) => {
    const val = e.target.value;
    if (val.length <= MAX_REVIEW_LENGTH + 50) { // allow typing with warning
      setReview(val);
      if (touched.review) {
        validateField('review', val);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      judgeName: true,
      rating: true,
      review: true
    });

    // Validate all
    const isNameValid = judgeName.trim().length >= MIN_NAME_LENGTH;
    const isRatingValid = rating >= 1 && rating <= 5;
    const isReviewValid = review.trim().length >= MIN_REVIEW_LENGTH && review.length <= MAX_REVIEW_LENGTH;

    const currentErrors = {};
    if (!isNameValid) currentErrors.judgeName = 'Please enter your name.';
    if (!isRatingValid) currentErrors.rating = 'Please select a star rating.';
    if (!isReviewValid) {
      if (review.trim().length < MIN_REVIEW_LENGTH) {
        currentErrors.review = `Feedback must be at least ${MIN_REVIEW_LENGTH} characters.`;
      } else {
        currentErrors.review = `Feedback cannot exceed ${MAX_REVIEW_LENGTH} characters.`;
      }
    }

    setErrors(currentErrors);

    if (Object.keys(currentErrors).length > 0) {
      if (!isNameValid && nameInputRef.current) {
        nameInputRef.current.focus();
      }
      return;
    }

    // Begin Submission
    setIsSubmitting(true);

    const savedReview = {
      judgeName: judgeName.trim(),
      rating,
      review: review.trim()
    };

    (async () => {
      try {
        if (onReviewSubmitted) {
          await onReviewSubmitted(savedReview);
        }
      } catch (err) {
        console.warn('Submission network note:', err);
      } finally {
        setSubmittedJudgeName(judgeName.trim());
        setIsSubmitting(false);
        setShowSuccess(true);

        // Auto reset after 4.5 seconds
        resetTimerRef.current = setTimeout(() => {
          handleResetForm();
        }, 4500);
      }
    })();
  };

  const handleResetForm = () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    setJudgeName('');
    setRating(0);
    setReview('');
    setErrors({});
    setTouched({});
    setShowSuccess(false);
    setSubmittedJudgeName('');
  };

  return (
    <div className="feedback-form-container">
      {/* Decorative Cyber Card Accents */}
      <div className="card-cyber-accent accent-top-left" />
      <div className="card-cyber-accent accent-top-right" />
      <div className="card-cyber-accent accent-bottom-left" />
      <div className="card-cyber-accent accent-bottom-right" />
      
      {showSuccess ? (
        <SuccessMessage 
          judgeName={submittedJudgeName} 
          onReset={handleResetForm} 
        />
      ) : (
        <form className="feedback-form" onSubmit={handleSubmit} noValidate>
          {/* Card Header */}
          <div className="form-card-header">
            <div className="form-header-badge">
              <span className="badge-pulse-indicator" />
              <span className="badge-text">JUDGE EVALUATION FORM</span>
            </div>
            <div className="form-header-cyber-code">IDC-3.0 // HEXA</div>
          </div>

          {/* FIELD 1: Judge Name */}
          <div className={`form-group ${touched.judgeName && errors.judgeName ? 'error' : ''}`}>
            <label htmlFor="judge-name-input" className="form-label">
              <span className="label-text">Judge Name</span>
              <span className="label-required">*</span>
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <input
                ref={nameInputRef}
                id="judge-name-input"
                type="text"
                className="form-input"
                placeholder="Enter your name"
                value={judgeName}
                onChange={handleNameChange}
                onBlur={() => handleBlur('judgeName')}
                disabled={isSubmitting}
                autoComplete="name"
              />
              <div className="input-focus-border" />
            </div>
            {touched.judgeName && errors.judgeName && (
              <div className="form-error-msg animate-error" role="alert">
                <span className="error-icon">⚠</span>
                <span>{errors.judgeName}</span>
              </div>
            )}
          </div>

          {/* FIELD 2: Star Rating */}
          <div className={`form-group ${touched.rating && errors.rating ? 'error' : ''}`}>
            <label className="form-label">
              <span className="label-text">Overall Rating</span>
              <span className="label-required">*</span>
            </label>
            <StarRating
              value={rating}
              onChange={handleRatingChange}
              error={Boolean(touched.rating && errors.rating)}
            />
            {touched.rating && errors.rating && (
              <div className="form-error-msg animate-error" role="alert">
                <span className="error-icon">⚠</span>
                <span>{errors.rating}</span>
              </div>
            )}
          </div>

          {/* FIELD 3: Written Feedback */}
          <div className={`form-group ${touched.review && errors.review ? 'error' : ''}`}>
            <div className="label-with-counter">
              <label htmlFor="written-feedback-input" className="form-label">
                <span className="label-text">Your Feedback</span>
                <span className="label-required">*</span>
              </label>
              <span className={`char-counter ${review.length > MAX_REVIEW_LENGTH ? 'limit-exceeded' : ''}`}>
                {review.length} / {MAX_REVIEW_LENGTH}
              </span>
            </div>
            <div className="textarea-wrapper">
              <textarea
                id="written-feedback-input"
                rows="4"
                className="form-textarea"
                placeholder="Tell us what you liked, what could be improved, or any suggestions for our project..."
                value={review}
                onChange={handleReviewChange}
                onBlur={() => handleBlur('review')}
                disabled={isSubmitting}
              />
              <div className="input-focus-border" />
            </div>
            {touched.review && errors.review && (
              <div className="form-error-msg animate-error" role="alert">
                <span className="error-icon">⚠</span>
                <span>{errors.review}</span>
              </div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <div className="form-action-row">
            <button
              type="submit"
              className={`submit-feedback-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
              id="submit-feedback-button"
            >
              <div className="btn-glow-layer" />
              <div className="btn-content">
                {isSubmitting ? (
                  <>
                    <span className="cyber-spinner" />
                    <span>SUBMITTING...</span>
                  </>
                ) : (
                  <>
                    <span className="btn-label">SUBMIT FEEDBACK</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
