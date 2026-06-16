'use client';

import React, { useState, useEffect } from 'react';

export default function Hero({ onOpenAuth }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1700);
    return () => clearTimeout(timer);
  }, []);

  const handleExploreClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('about');
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="hero-section grid-overlay">
      <style jsx>{`
        .hero-section {
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 140px 20px 80px;
          background: var(--gradient-linear-6);
          position: relative;
          overflow: hidden;
        }

        /* Subtle ambient light effects */
        .ambient-light-1 {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, rgba(255,255,255,0) 70%);
          top: -100px;
          left: -100px;
          z-index: 0;
          pointer-events: none;
        }

        .ambient-light-2 {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(255,255,255,0) 70%);
          bottom: -100px;
          right: -100px;
          z-index: 0;
          pointer-events: none;
        }

        .hero-content {
          max-width: 900px;
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          width: 100%;
        }

        /* Staggered reveal */
        .hero-item {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-item.show {
          opacity: 1;
          transform: translateY(0);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(226, 232, 240, 0.8);
          padding: 8px 20px;
          border-radius: 9999px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          font-family: var(--font-inter);
          font-size: 13px;
          font-weight: 700;
          color: var(--color-dark-slate-gray-1);
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background-color: var(--color-light-sea-green);
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px var(--color-light-sea-green);
        }

        .hero-title {
          font-family: var(--font-plus-jakarta-sans);
          font-size: 60px;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -1.5px;
          color: var(--color-black-1);
        }

        .hero-title span {
          background: var(--gradient-linear-9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-family: var(--font-inter);
          font-size: 19px;
          font-weight: 500;
          line-height: 1.6;
          color: var(--color-dark-slate-gray-1);
          max-width: 650px;
          margin: 0 auto;
        }

        .ctas-container {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 10px;
        }

        .primary-cta {
          background: var(--color-black-2);
          color: var(--color-white);
          padding: 16px 36px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.15);
          cursor: pointer;
          border: none;
          transition: all 0.25s ease;
        }

        .primary-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(15, 23, 42, 0.25);
          background: var(--color-black-1);
        }

        .secondary-cta {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(203, 213, 225, 0.8);
          color: var(--color-dark-slate-gray);
          padding: 16px 36px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .secondary-cta:hover {
          transform: translateY(-2px);
          background: #ffffff;
          border-color: var(--color-dark-gray);
        }

        /* Ratings block style */
        .rating-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 10px;
        }

        .avatar-group {
          display: flex;
          align-items: center;
        }

        .rating-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          margin-left: -8px;
          object-fit: cover;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .rating-avatar:first-child {
          margin-left: 0;
        }

        .avatar-plus {
          background: #0f172a;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          font-family: var(--font-plus-jakarta-sans), sans-serif;
        }

        .rating-stats-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          line-height: 1.1;
        }

        .rating-number {
          font-family: var(--font-plus-jakarta-sans), sans-serif;
          font-weight: 800;
          color: #0f172a;
          font-size: 14px;
        }

        .rating-label {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }

        .rating-separator {
          width: 1px;
          height: 24px;
          background: #cbd5e1;
        }

        .stars-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          line-height: 1.1;
        }

        .stars {
          color: #fbbf24;
          font-size: 10px;
          display: flex;
          gap: 2px;
        }

        .stars-label {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }

        /* Stats Card Styles */
        .stats-card {
          margin-top: 36px;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          border-radius: 20px;
          padding: 26px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 900px;
          z-index: 10;
        }

        .stat-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .stat-number {
          font-family: var(--font-plus-jakarta-sans), sans-serif;
          font-size: 32px;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
        }

        .stat-label {
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: center;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: #e2e8f0;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 120px 20px 60px;
          }
          .hero-title {
            font-size: 38px;
            letter-spacing: -0.8px;
          }
          .hero-subtitle {
            font-size: 16px;
          }
          .ctas-container {
            flex-direction: column;
            width: 100%;
            gap: 12px;
          }
          .primary-cta, .secondary-cta {
            width: 100%;
            justify-content: center;
            padding: 14px 28px;
          }
          .rating-row {
            flex-direction: column;
            gap: 12px;
            margin-top: 20px;
          }
          .rating-separator {
            display: none;
          }
          .rating-stats-info, .stars-group {
            align-items: center;
            text-align: center;
          }
          .stats-card {
            flex-direction: column;
            gap: 20px;
            padding: 24px;
            margin-top: 40px;
          }
          .stat-divider {
            width: 100%;
            height: 1px;
            background: #e2e8f0;
          }
        }
      `}</style>
      <div className="ambient-light-1"></div>
      <div className="ambient-light-2"></div>

      <div className="hero-content">
        <div className={`hero-item ${loaded ? 'show' : ''}`} style={{ transitionDelay: '0s' }}>
          <div className="badge">
            <span className="badge-dot"></span>
            NextGen
          </div>
        </div>

        <h1 className={`hero-item hero-title ${loaded ? 'show' : ''}`} style={{ transitionDelay: '0.12s' }}>
          Kickstart Your Career <br />
          With <span>NextGen</span>
        </h1>

        <p className={`hero-item hero-subtitle ${loaded ? 'show' : ''}`} style={{ transitionDelay: '0.24s' }}>
          Skill Jobs NextGen is the official student community and campus leadership platform of Skill Jobs. We build leadership skills, career readiness, networking, and employability for future leaders.
        </p>

        <div className={`hero-item ctas-container ${loaded ? 'show' : ''}`} style={{ transitionDelay: '0.36s' }}>
          <button className="primary-cta" onClick={onOpenAuth}>
            Join NextGen
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className="secondary-cta" onClick={handleExploreClick}>
            Explore Benefits
          </button>
        </div>

        {/* Overlapping avatar group & rating stats */}
        <div className={`hero-item rating-row ${loaded ? 'show' : ''}`} style={{ transitionDelay: '0.48s' }}>
          <div className="avatar-group">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" alt="Student 1" className="rating-avatar" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" alt="Student 2" className="rating-avatar" />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80" alt="Student 3" className="rating-avatar" />
            <div className="rating-avatar avatar-plus">+</div>
          </div>
          <div className="rating-stats-info">
            <span className="rating-number">30,000+ Students</span>
            <span className="rating-label">Active Campus Network</span>
          </div>
          <div className="rating-separator"></div>
          <div className="stars-group">
            <div className="stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <span className="stars-label">4.9/5 Student Rating</span>
          </div>
        </div>

        {/* Light theme stats grid container */}
        <div className={`hero-item stats-card ${loaded ? 'show' : ''}`} style={{ transitionDelay: '0.6s' }}>
          <div className="stat-item">
            <span className="stat-number">25</span>
            <span className="stat-label">Campus Programs</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">120+</span>
            <span className="stat-label">Batches Completed</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">20,000+</span>
            <span className="stat-label">Successful Students</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">100+</span>
            <span className="stat-label">Expert Mentors</span>
          </div>
        </div>
      </div>
    </section>
  );
}
