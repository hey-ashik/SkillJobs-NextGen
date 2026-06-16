'use client';

import React, { useState } from 'react';

const programCards = [
  {
    id: 'ambassador',
    title: 'Ambassador Program',
    desc: 'Represent Skill Jobs on your campus and lead a community of active learners and achievers.',
    details: 'As a Campus Ambassador, you will coordinate events, run leadership workshops, and serve as the direct bridge between Skill Jobs and your fellow university students. This program is designed to give you firsthand managerial and leadership experience.',
    icon: 'fa-solid fa-crown',
    accent: 'var(--color-medium-purple)'
  },
  {
    id: 'training',
    title: 'Training & Workshops',
    desc: 'Join interactive career readiness masterclasses and practical skill acquisition bootcamps.',
    details: 'From coding and digital marketing to soft skills like negotiation and public speaking, our training programs are led by industry professionals to make sure you are job-market-ready.',
    icon: 'fa-solid fa-graduation-cap',
    accent: 'var(--color-royal-blue-2)'
  },
  {
    id: 'activities',
    title: 'University Activities',
    desc: 'Engage with job fairs, career seminars, coding hackathons, and campus innovation contests.',
    details: 'We support campus clubs, build career development cells, and host large-scale university activities to activate student talent on campus.',
    icon: 'fa-solid fa-building',
    accent: 'var(--color-light-sea-green)'
  },
  {
    id: 'internship',
    title: 'Internship Support',
    desc: 'Gain direct access to internship applications and mock interviews with top partner companies.',
    details: 'Get your CV reviewed by corporate HR leaders, practice with live mock interviews, and receive recommendation letters and internship placement support.',
    icon: 'fa-solid fa-briefcase',
    accent: 'var(--color-deep-pink)'
  }
];

const ambassadorBenefits = [
  { text: 'Build leadership and project management skills', icon: 'fa-solid fa-rocket' },
  { text: 'Improve public speaking, communication & presentation', icon: 'fa-solid fa-bullhorn' },
  { text: 'Grow professional networks with corporate leaders', icon: 'fa-solid fa-globe' },
  { text: 'Access exclusive premium workshops and training free', icon: 'fa-solid fa-key' },
  { text: 'Get official certificates and recommendations', icon: 'fa-solid fa-file-invoice' },
  { text: 'Increase internship and career placement opportunities', icon: 'fa-solid fa-bullseye' },
  { text: 'Gain real-world experience managing student communities', icon: 'fa-solid fa-star' }
];

export default function ProgramsSection({ onOpenAuth }) {
  const [activeDetails, setActiveDetails] = useState(null);

  const toggleDetails = (id) => {
    if (activeDetails === id) {
      setActiveDetails(null);
    } else {
      setActiveDetails(id);
    }
  };

  return (
    <section id="ambassador" className="programs-section grid-overlay">
      <style jsx>{`
        .programs-section {
          padding: 100px 20px;
          background: #ffffff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 80px;
          position: relative;
          z-index: 10;
        }

        .section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .section-badge {
          align-self: center;
          background: var(--color-ghost-white-1);
          color: var(--color-royal-blue-1);
          border: 1px solid var(--color-lavender-2);
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .section-title {
          font-family: var(--font-plus-jakarta-sans);
          font-size: 38px;
          font-weight: 900;
          color: var(--color-dark-gray-1);
        }

        .programs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .program-card {
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: var(--border-radius-lg);
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .program-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.1);
        }

        .card-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .card-title {
          font-family: var(--font-plus-jakarta-sans);
          font-size: 19px;
          font-weight: 900;
          color: var(--color-dark-gray-1);
        }

        .card-desc {
          font-family: var(--font-inter);
          font-size: 14px;
          color: var(--color-slate-gray-1);
          line-height: 1.6;
          flex-grow: 1;
        }

        .learn-more-btn {
          align-self: flex-start;
          font-family: var(--font-inter);
          font-size: 14px;
          font-weight: 700;
          color: var(--color-royal-blue-1);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .learn-more-btn:hover {
          color: var(--color-blue-violet-1);
        }

        .details-panel {
          margin-top: 10px;
          padding-top: 15px;
          border-top: 1px dashed rgba(226, 232, 240, 0.8);
          font-size: 13px;
          color: var(--color-dark-slate-gray-1);
          line-height: 1.6;
          animation: slideUp 0.3s ease-out;
        }

        /* Ambassador Benefits Layout */
        .benefits-block {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
          background: var(--color-ghost-white);
          border-radius: var(--border-radius-lg);
          padding: 60px;
          border: 1px solid rgba(226, 232, 240, 0.6);
        }

        .benefits-text {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .benefits-title {
          font-family: var(--font-plus-jakarta-sans);
          font-size: 34px;
          font-weight: 900;
          color: var(--color-dark-gray-1);
        }

        .benefits-desc {
          font-size: 15px;
          color: var(--color-slate-gray-1);
          line-height: 1.6;
        }

        .benefits-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #ffffff;
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid rgba(226, 232, 240, 0.6);
          transition: all 0.2s;
        }

        .benefit-item:hover {
          border-color: var(--color-royal-blue-2);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
          transform: translateX(4px);
        }

        .benefit-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--color-alice-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .benefit-text {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-dark-slate-gray);
        }

        .apply-btn {
          align-self: flex-start;
          background: var(--gradient-linear-1);
          color: #ffffff;
          padding: 14px 28px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 15px;
          box-shadow: 0 8px 16px rgba(79, 70, 229, 0.2);
          margin-top: 10px;
        }

        .apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(79, 70, 229, 0.3);
        }

        @media (max-width: 1024px) {
          .programs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .benefits-block {
            grid-template-columns: 1fr;
            padding: 40px;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .programs-section {
            padding: 70px 20px;
          }
          .section-title {
            font-size: 30px;
          }
          .benefits-title {
            font-size: 26px;
          }
          .benefits-block {
            padding: 30px 20px;
          }
        }

        @media (max-width: 550px) {
          .programs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="container">
        {/* PROGRAMS SECTION */}
        <div id="events" className="section-header">
          <span className="section-badge">Programs</span>
          <h2 className="section-title">What NextGen Does</h2>
        </div>

        <div className="programs-grid">
          {programCards.map((card) => (
            <div key={card.id} className="program-card">
              <div
                className="card-icon"
                style={{ backgroundColor: `${card.accent}15`, color: card.accent }}
              >
                <i className={card.icon}></i>
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.desc}</p>
              
              <button className="learn-more-btn" onClick={() => toggleDetails(card.id)}>
                {activeDetails === card.id ? 'Close details' : 'Learn more'}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: activeDetails === card.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }}
                >
                  <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {activeDetails === card.id && (
                <div className="details-panel">
                  {card.details}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AMBASSADOR BENEFITS SECTION */}
        <div className="benefits-block">
          <div className="benefits-text">
            <span className="section-badge">Become an Ambassador</span>
            <h2 className="benefits-title">Why Join the Campus Leadership Team?</h2>
            <p className="benefits-desc">
              Being a Campus Ambassador is more than a title. It's a leadership accelerator. You'll gain real-world experience, access exclusive professional networks, and build high-value employability credentials while still at university.
            </p>
            <button className="apply-btn" onClick={onOpenAuth}>
              Apply as Ambassador
            </button>
          </div>

          <div className="benefits-list">
            {ambassadorBenefits.map((benefit, idx) => (
              <div key={idx} className="benefit-item">
                <div className="benefit-icon">
                  <i className={benefit.icon}></i>
                </div>
                <span className="benefit-text">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
