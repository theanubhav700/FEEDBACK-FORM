import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeedbackForm from './components/FeedbackForm';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import { getReviews, saveReview } from './utils/reviewStorage';
import './App.css';

export default function App() {
  const [, setReviews] = useState(() => getReviews());
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('hexa_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('hexa_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleReviewSubmitted = (newReviewData) => {
    // Save to localStorage securely
    const updated = saveReview(newReviewData);
    setReviews(updated);
  };

  return (
    <div className="terminal-app-root">
      {/* Background Animated Cyber Layer */}
      <BackgroundEffects />

      {/* Main Top Header */}
      <Header theme={theme} onToggleTheme={handleToggleTheme} />

      {/* Main Content Area */}
      <main className="main-content-layout">
        {/* Hero Section */}
        <Hero />

        {/* Primary Interactive Section: Feedback Form */}
        <section className="form-presentation-section" aria-label="Feedback Submission">
          <FeedbackForm onReviewSubmitted={handleReviewSubmitted} />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
