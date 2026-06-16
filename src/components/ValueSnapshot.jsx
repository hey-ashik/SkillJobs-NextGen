import React from 'react';

const valueItems = [
  {
    icon: 'fa-solid fa-bolt',
    title: 'Skill Development',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.08)'
  },
  {
    icon: 'fa-solid fa-briefcase',
    title: 'Internship & Jobs',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.08)'
  },
  {
    icon: 'fa-solid fa-crown',
    title: 'Ambassador Program',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.08)'
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    title: 'Career Workshops',
    color: '#fbbf24',
    bgColor: 'rgba(251, 191, 36, 0.08)'
  },
  {
    icon: 'fa-solid fa-handshake',
    title: 'Networking Events',
    color: '#db2777',
    bgColor: 'rgba(219, 39, 119, 0.08)'
  }
];

export default function ValueSnapshot() {
  return (
    <section className="snapshot-section">
      <style jsx>{`
        .snapshot-section {
          padding: 40px 20px;
          background: #ffffff;
          border-top: 1px solid rgba(226, 232, 240, 0.6);
          border-bottom: 1px solid rgba(226, 232, 240, 0.6);
          position: relative;
          z-index: 20;
        }

        .snapshot-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }

        .snapshot-card {
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
        }

        .snapshot-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -10px rgba(15, 23, 42, 0.1);
          border-color: var(--color-royal-blue-2);
        }

        .icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .card-title {
          font-family: var(--font-inter);
          font-size: 14px;
          font-weight: 700;
          color: var(--color-dark-slate-gray);
          line-height: 1.3;
        }

        @media (max-width: 1024px) {
          .snapshot-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .snapshot-section {
            padding: 30px 15px;
          }
          .snapshot-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .snapshot-card {
            padding: 16px;
            gap: 12px;
          }
          .icon-box {
            width: 36px;
            height: 36px;
            font-size: 14px;
          }
          .card-title {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .snapshot-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="snapshot-container">
        {valueItems.map((item, idx) => (
          <div key={idx} className="snapshot-card">
            <div className="icon-box" style={{ backgroundColor: item.bgColor, color: item.color }}>
              <i className={item.icon}></i>
            </div>
            <h4 className="card-title">{item.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
