'use client';

import React from 'react';

export default function Hero({ onOpenAuth }) {
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
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
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
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
          opacity: 0;
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
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }

        .ctas-container {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 10px;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
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
        }

        .secondary-cta:hover {
          transform: translateY(-2px);
          background: #ffffff;
          border-color: var(--color-dark-gray);
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
        }
      `}</style>
      <div className="ambient-light-1"></div>
      <div className="ambient-light-2"></div>
      
      <div className="hero-content">
        <div className="badge">
          <span className="badge-dot"></span>
          NextGen
        </div>
        
        <h1 className="hero-title">
          Kickstart Your Career <br />
          With <span>NextGen</span>
        </h1>
        
        <p className="hero-subtitle">
          Skill Jobs NextGen is the official student community and campus leadership platform of Skill Jobs. We build leadership skills, career readiness, networking, and employability for future leaders.
        </p>
        
        <div className="ctas-container">
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
      </div>
    </section>
  );
}
