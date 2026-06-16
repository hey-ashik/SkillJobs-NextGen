'use client';

import React from 'react';

export default function AboutSection({ onOpenAuth }) {
  return (
    <section id="about" className="about-section">
      <style jsx>{`
        .about-section {
          padding: 80px 20px;
          background: #ffffff;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .promo-card {
          background: rgba(27, 77, 155, 0.04);
          border: 1px solid rgba(27, 77, 155, 0.08);
          border-radius: 24px;
          padding: 50px 60px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 50px;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.01);
        }

        /* Subtle grid background texture inside the card */
        .promo-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(rgba(27, 77, 155, 0.1) 1.5px, transparent 0);
          background-size: 24px 24px;
          pointer-events: none;
          z-index: 1;
        }

        .card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
          text-align: left;
        }

        .card-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 1px solid rgba(27, 77, 155, 0.15);
          color: #1b4d9b;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-badge-dot {
          width: 6px;
          height: 6px;
          background: #e11d48;
          border-radius: 50%;
        }

        .card-title {
          font-family: var(--font-plus-jakarta-sans), sans-serif;
          font-size: 34px;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.25;
          letter-spacing: -0.8px;
        }

        .card-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: 15px;
          color: #475569;
          line-height: 1.65;
        }

        .card-btn {
          background: #0f172a;
          color: #ffffff;
          border: none;
          padding: 14px 30px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
        }

        .card-btn:hover {
          background: #1b4d9b;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(27, 77, 155, 0.2);
        }

        .card-visual {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .visual-img {
          width: 100%;
          max-width: 440px;
          height: 280px;
          object-fit: cover;
          border-radius: 18px;
          box-shadow: 0 15px 35px rgba(15, 23, 42, 0.1);
        }

        @media (max-width: 900px) {
          .promo-card {
            grid-template-columns: 1fr;
            padding: 40px 30px;
            gap: 30px;
          }
          .card-title {
            font-size: 28px;
          }
          .visual-img {
            max-width: 100%;
            height: 220px;
          }
        }
      `}</style>
      
      <div className="container">
        <div className="promo-card">
          <div className="card-content">
            <div className="card-badge">
              <span className="card-badge-dot"></span>
              What is NextGen?
            </div>
            
            <h2 className="card-title">
              Bridging Academics and the Professional World
            </h2>
            
            <p className="card-desc">
              Skill Jobs NextGen is the official student community and campus leadership platform of Skill Jobs. We believe that classroom learning is only the first step. To thrive in the competitive global economy, students need practical skills, real experience, and robust professional connections.
            </p>
            
            <button className="card-btn" onClick={onOpenAuth}>
              Join NextGen Community
            </button>
          </div>
          
          <div className="card-visual">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&h=400&q=80" 
              alt="Students Collaborating" 
              className="visual-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
