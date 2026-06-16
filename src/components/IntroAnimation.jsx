'use client';

import React, { useState, useEffect } from 'react';

export default function IntroAnimation() {
  const [stage, setStage] = useState('logo'); // 'logo', 'fadeout', 'done'

  useEffect(() => {
    document.body.classList.add('loaded');

    // Show logo for 1.1s, then fade out
    const t1 = setTimeout(() => {
      setStage('fadeout');
    }, 1100);

    // Remove overlay after fade-out completes
    const t2 = setTimeout(() => {
      setStage('done');
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (stage === 'done') return null;

  return (
    <div className={`intro-overlay ${stage === 'fadeout' ? 'fadeout' : ''}`}>
      <style jsx>{`
        .intro-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #ffffff;
          z-index: 100000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          opacity: 1;
          transition: opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .intro-overlay.fadeout {
          opacity: 0;
          pointer-events: none;
        }

        /* Logo Content Styling */
        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: translateY(15px);
          animation: logoEntrance 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .logo-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dot-small {
          width: 10px;
          height: 10px;
          background-color: #3b82f6;
          border-radius: 50%;
        }

        .dot-large {
          width: 20px;
          height: 20px;
          background-color: #1b4d9b;
          border-radius: 50%;
        }

        .logo-text {
          font-family: var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif;
          font-size: 28px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -1.2px;
        }

        /* Keyframes */
        @keyframes logoEntrance {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Main Logo Reveal */}
      <div className="logo-container">
        <div className="logo-dots">
          <div className="dot-small"></div>
          <div className="dot-large"></div>
        </div>
        <span className="logo-text">with NextGen</span>
      </div>
    </div>
  );
}
