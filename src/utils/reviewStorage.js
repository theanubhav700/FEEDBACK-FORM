// Utility for handling Judge Feedback persistence in localStorage
export const STORAGE_KEY = 'idc_hackathon_3_feedback';

/**
 * Safely retrieves all reviews from localStorage
 * Fallback to empty array if corrupted or missing
 */
export function getReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.warn('Failed to parse reviews from localStorage, falling back to empty array.', err);
    return [];
  }
}

/**
 * Format timestamp into human-readable string: e.g. "03 Oct 2026 • 01:25 AM"
 */
export function formatReviewDate(dateInput) {
  try {
    const date = dateInput ? new Date(dateInput) : new Date();
    if (isNaN(date.getTime())) return 'Recently';

    const day = String(date.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const strHours = String(hours).padStart(2, '0');

    return `${day} ${month} ${year} • ${strHours}:${minutes} ${ampm}`;
  } catch {
    return 'Recently';
  }
}

/**
 * Generates a unique review ID
 */
export function generateReviewId() {
  return 'rev_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
}

/**
 * Saves a new review to localStorage (prepends to make newest appear first)
 * Returns the updated array of reviews
 */
export function saveReview({ judgeName, judgeEmail, rating, review }) {
  const currentReviews = getReviews();
  const now = new Date();

  const newReview = {
    id: generateReviewId(),
    judgeName: judgeName.trim(),
    judgeEmail: judgeEmail ? judgeEmail.trim() : '',
    rating: Number(rating),
    review: review.trim(),
    createdAt: now.toISOString(),
    formattedDate: formatReviewDate(now)
  };

  const updated = [newReview, ...currentReviews];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save review to localStorage:', err);
  }

  return updated;
}

/**
 * Deletes a review by ID (clean utility)
 */
export function deleteReview(id) {
  const current = getReviews();
  const updated = current.filter(item => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update localStorage after delete:', err);
  }
  return updated;
}

/**
 * Clears all reviews from localStorage
 */
export function clearReviews() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear reviews:', err);
  }
  return [];
}

/**
 * Computes dynamic statistics from reviews
 */
export function computeReviewStats(reviews = []) {
  const total = reviews.length;
  if (total === 0) {
    return {
      total: 0,
      average: '0.0',
      fiveStarCount: 0,
      distribution: [
        { star: 5, count: 0, percentage: 0 },
        { star: 4, count: 0, percentage: 0 },
        { star: 3, count: 0, percentage: 0 },
        { star: 2, count: 0, percentage: 0 },
        { star: 1, count: 0, percentage: 0 },
      ]
    };
  }

  const sum = reviews.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0);
  const average = (sum / total).toFixed(1);
  const fiveStarCount = reviews.filter(r => Number(r.rating) === 5).length;

  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    const star = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 0)));
    counts[star] = (counts[star] || 0) + 1;
  });

  const distribution = [5, 4, 3, 2, 1].map(star => {
    const count = counts[star] || 0;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return { star, count, percentage };
  });

  return {
    total,
    average,
    fiveStarCount,
    distribution
  };
}
