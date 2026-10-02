import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeedbackForm from './components/FeedbackForm';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import DesktopBlocker from './components/DesktopBlocker';
import { getReviews, saveReview } from './utils/reviewStorage';
import { initSecurityGuards, isDesktopDevice } from './utils/securityGuards';
import './App.css';

export default function App() {
  const [, setReviews] = useState(() => getReviews());
  const [isDesktop, setIsDesktop] = useState(() => isDesktopDevice());
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('hexa_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    // Initialize DevTools blocking, anti-zoom, pull-to-refresh lock, and right click lock
    initSecurityGuards();

    const handleCheckDevice = () => {
      setIsDesktop(isDesktopDevice());
    };

    window.addEventListener('resize', handleCheckDevice);
    window.addEventListener('orientationchange', handleCheckDevice);
    return () => {
      window.removeEventListener('resize', handleCheckDevice);
      window.removeEventListener('orientationchange', handleCheckDevice);
    };
  }, []);

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

  const handleReviewSubmitted = async (newReviewData) => {
    // 1. Save to localStorage for instant local access
    const updated = saveReview(newReviewData);
    setReviews(updated);

    // 2. Transmit to Central MongoDB database via Render backend
    try {
      await fetch('https://hackathon-3-0-awsf.onrender.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          judgeName: newReviewData.judgeName,
          rating: newReviewData.rating,
          review: newReviewData.review,
          category: 'IDC Hackathon 3.0 // HEXA',
        }),
      });
      console.log('✅ Feedback successfully stored in MongoDB database!');
    } catch (err) {
      console.warn('Backend sync note:', err);
    }
  };

  if (isDesktop) {
    return <DesktopBlocker />;
  }

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
