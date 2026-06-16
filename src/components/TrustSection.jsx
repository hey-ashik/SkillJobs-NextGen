'use client';

import React from 'react';

export default function TrustSection() {
  return (
    <section className="trust-section grid-overlay">
      <style jsx>{`
        .trust-section {
          padding: 90px 20px;
          background: #f8fafc;
          border-top: 1px solid rgba(226, 232, 240, 0.8);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          position: relative;
          overflow: hidden;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .header {
          text-align: center;
          max-width: 750px;
          margin: 0 auto 50px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .title {
          font-family: var(--font-plus-jakarta-sans), sans-serif;
          font-size: 38px;
          font-weight: 900;
          color: #1b4d9b;
          line-height: 1.25;
          letter-spacing: -0.8px;
        }

        .title span {
          color: #e11d48;
        }

        .description {
          font-family: var(--font-inter), sans-serif;
          font-size: 15px;
          color: #64748b;
          line-height: 1.65;
        }

        /* 12-Column Grid Layout */
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
        }

        /* Base Card Styles */
        .trust-card {
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 24px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          min-height: 220px;
        }

        .trust-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.05);
          border-color: rgba(27, 77, 155, 0.2);
        }

        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .stat-number {
          font-family: var(--font-plus-jakarta-sans), sans-serif;
          font-size: 44px;
          font-weight: 900;
          color: #0f172a;
          line-height: 1;
        }

        .arrow-icon {
          color: #e11d48;
          font-size: 18px;
          transition: transform 0.2s ease;
        }

        .trust-card:hover .arrow-icon {
          transform: translate(2px, -2px);
        }

        .stat-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #475569;
          margin-top: 4px;
        }

        /* Column spans for desktop */
        .card-workshops {
          grid-column: span 5;
        }

        .card-members {
          grid-column: span 7;
          flex-direction: row;
        }

        .card-members-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
        }

        .card-ambassadors {
          grid-column: span 4;
        }

        .card-satisfaction {
          grid-column: span 4;
          align-items: center;
          text-align: center;
        }

        .card-certified {
          grid-column: span 4;
        }

        /* Custom Visual Contents */

        /* Card 1: Overlapping workshops */
        .workshops-preview {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }

        .workshop-tag {
          padding: 8px 12px;
          background: rgba(27, 77, 155, 0.06);
          border: 1px solid rgba(27, 77, 155, 0.1);
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          color: #1b4d9b;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Card 2: Student cutout */
        .student-cutout-container {
          position: absolute;
          bottom: 0;
          right: 30px;
          width: 160px;
          height: 160px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .student-cutout {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.05);
        }

        /* Card 3: Ambassadors list */
        .ambassadors-row {
          display: flex;
          align-items: center;
          margin-top: 24px;
        }

        .ambassador-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          margin-left: -10px;
          object-fit: cover;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .ambassador-avatar:first-child {
          margin-left: 0;
        }

        .ambassador-plus {
          background: #e11d48;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          font-family: var(--font-plus-jakarta-sans), sans-serif;
        }

        /* Card 4: Satisfaction Gauge */
        .gauge-wrapper {
          margin-top: 10px;
          display: flex;
          justify-content: center;
          position: relative;
        }

        .gauge-text {
          position: absolute;
          bottom: 12px;
          font-family: var(--font-plus-jakarta-sans), sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
        }

        /* Card 5: Certificate Badge */
        .cert-badge-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 20px;
          background: rgba(16, 185, 129, 0.04);
          border: 1px dashed rgba(16, 185, 129, 0.3);
          padding: 12px;
          border-radius: 14px;
        }

        .cert-icon {
          font-size: 32px;
          color: #10b981;
        }

        .cert-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cert-title {
          font-size: 12px;
          font-weight: 800;
          color: #0f172a;
        }

        .cert-desc {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .card-workshops { grid-column: span 6; }
          .card-members { grid-column: span 6; }
          .card-ambassadors { grid-column: span 4; }
          .card-satisfaction { grid-column: span 4; }
          .card-certified { grid-column: span 4; }
        }

        @media (max-width: 768px) {
          .trust-section {
            padding: 60px 20px;
          }
          .title {
            font-size: 30px;
          }
          .trust-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .card-workshops, .card-members, .card-ambassadors, .card-satisfaction, .card-certified {
            grid-column: span 1;
            min-height: auto;
          }
          .card-members {
            flex-direction: column;
            gap: 20px;
          }
          .student-cutout-container {
            position: relative;
            bottom: auto;
            right: auto;
            width: 100%;
            height: 120px;
          }
          .student-cutout {
            height: 100%;
            width: auto;
          }
        }
      `}</style>

      <div className="container">
        <div className="header">
          <h2 className="title">Why Students and Institutions Trust <span>NextGen</span></h2>
          <p className="description">
            Accelerating employability requires hands-on student leadership, certified industry workshops, and practical work experience. NextGen bridges the gap between academic theory and active career success.
          </p>
        </div>

        <div className="trust-grid">
          {/* Card 1: Workshops */}
          <div className="trust-card card-workshops">
            <div>
              <div className="card-header-row">
                <span className="stat-number">50+</span>
                <span className="arrow-icon"><i className="fa-solid fa-arrow-up-right-from-square"></i></span>
              </div>
              <div className="stat-label">Career Workshops</div>
            </div>
            
            <div className="workshops-preview">
              <div className="workshop-tag">
                <i className="fa-solid fa-file-pen"></i> CV Review
              </div>
              <div className="workshop-tag">
                <i className="fa-solid fa-laptop-code"></i> Skills Lab
              </div>
              <div className="workshop-tag">
                <i className="fa-solid fa-comment-dots"></i> Mock Vivas
              </div>
            </div>
          </div>

          {/* Card 2: Active Members */}
          <div className="trust-card card-members">
            <div className="card-members-left">
              <div>
                <div className="card-header-row">
                  <span className="stat-number">30,000+</span>
                  <span className="arrow-icon"><i className="fa-solid fa-arrow-up-right-from-square"></i></span>
                </div>
                <div className="stat-label">Active Members</div>
              </div>
            </div>

            <div className="student-cutout-container">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&h=300&q=80" 
                alt="Student Ambassador" 
                className="student-cutout"
              />
            </div>
          </div>

          {/* Card 3: Ambassadors */}
          <div className="trust-card card-ambassadors">
            <div>
              <div className="card-header-row">
                <span className="stat-number">500+</span>
                <span className="arrow-icon"><i className="fa-solid fa-arrow-up-right-from-square"></i></span>
              </div>
              <div className="stat-label">Campus Leaders</div>
            </div>

            <div className="ambassadors-row">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" alt="Ambassador 1" className="ambassador-avatar" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" alt="Ambassador 2" className="ambassador-avatar" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80" alt="Ambassador 3" className="ambassador-avatar" />
              <div className="ambassador-avatar ambassador-plus">+450</div>
            </div>
          </div>

          {/* Card 4: Satisfaction */}
          <div className="trust-card card-satisfaction">
            <div>
              <div className="card-header-row">
                <span className="stat-number">95%</span>
                <span className="arrow-icon"><i className="fa-solid fa-arrow-up-right-from-square"></i></span>
              </div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>

            <div className="gauge-wrapper">
              <svg width="120" height="70" viewBox="0 0 120 70">
                <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="#f1f5f9" strokeWidth="8" strokeLinecap="round" />
                <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="#1b4d9b" strokeWidth="8" strokeLinecap="round" strokeDasharray="157" strokeDashoffset="8" />
              </svg>
              <div className="gauge-text">95%</div>
            </div>
          </div>

          {/* Card 5: Certified Credentials */}
          <div className="trust-card card-certified">
            <div>
              <div className="card-header-row">
                <span className="stat-number">Certified</span>
                <span className="arrow-icon"><i className="fa-solid fa-arrow-up-right-from-square"></i></span>
              </div>
              <div className="stat-label">Industry Endorsed</div>
            </div>

            <div className="cert-badge-wrapper">
              <div className="cert-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div className="cert-info">
                <span className="cert-title">Verified Badging</span>
                <span className="cert-desc">SkillJobs Employer Network</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
