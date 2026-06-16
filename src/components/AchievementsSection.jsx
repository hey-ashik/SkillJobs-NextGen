import React from 'react';

const stats = [
  { value: '25,000+', label: 'Students Trained', icon: 'fa-solid fa-user-graduate' },
  { value: '50+', label: 'Universities Connected', icon: 'fa-solid fa-school' },
  { value: '150+', label: 'Workshops & Events', icon: 'fa-solid fa-calendar-days' },
  { value: '1,200+', label: 'Internships Placed', icon: 'fa-solid fa-briefcase' }
];

export default function AchievementsSection() {
  return (
    <section className="stats-section">
      <style jsx>{`
        .stats-section {
          padding: 80px 20px;
          background: linear-gradient(135deg, var(--color-dark-gray-1) 0%, var(--color-black-2) 100%);
          color: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .stats-section::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(0,0,0,0) 70%);
          top: -50px;
          right: -50px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 50px;
          position: relative;
          z-index: 10;
        }

        .section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .section-title {
          font-family: var(--font-plus-jakarta-sans);
          font-size: 34px;
          font-weight: 900;
          letter-spacing: -0.5px;
        }

        .section-desc {
          font-size: 15px;
          color: var(--color-dark-gray);
          line-height: 1.6;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--border-radius-lg);
          padding: 30px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stat-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .stat-icon {
          font-size: 26px;
          margin-bottom: 5px;
        }

        .stat-number {
          font-family: var(--font-plus-jakarta-sans);
          font-size: 36px;
          font-weight: 900;
          background: var(--gradient-linear);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-label {
          font-size: 14px;
          font-weight: 700;
          color: var(--color-light-gray);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .section-title {
            font-size: 28px;
          }
        }
      `}</style>

      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Impact in Numbers</h2>
          <p className="section-desc">We measure our success by the growth, leadership achievements, and job placements of our community members.</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-icon"><i className={stat.icon}></i></span>
              <span className="stat-number">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
