import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="about-section grid-overlay">
      <style jsx>{`
        .about-section {
          padding: 100px 20px;
          background: var(--color-white-smoke);
          position: relative;
          overflow: hidden;
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 60px;
          position: relative;
          z-index: 10;
        }

        .grid-block {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .text-side {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-badge {
          align-self: flex-start;
          background: var(--color-ghost-white-1);
          color: var(--color-blue-violet-1);
          border: 1px solid var(--color-lavender-2);
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: var(--tracking-1-2);
        }

        .section-title {
          font-family: var(--font-plus-jakarta-sans);
          font-size: 38px;
          font-weight: 900;
          color: var(--color-dark-gray-1);
          line-height: 1.2;
        }

        .section-desc {
          font-family: var(--font-inter);
          font-size: 16px;
          line-height: 1.7;
          color: var(--color-dark-slate-gray-1);
        }

        .vision-card {
          background: #ffffff;
          border-radius: var(--border-radius-lg);
          padding: 40px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
          position: relative;
          overflow: hidden;
        }

        .vision-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 6px;
          height: 100%;
          background: var(--gradient-linear-7);
        }

        .vision-quote {
          font-family: var(--font-inter);
          font-size: 20px;
          font-weight: 700;
          color: var(--color-dark-gray-1);
          line-height: 1.5;
          margin-bottom: 15px;
        }

        .vision-author {
          font-family: var(--font-inter);
          font-size: 14px;
          font-weight: 600;
          color: var(--color-royal-blue-1);
        }

        @media (max-width: 900px) {
          .about-section {
            padding: 70px 20px;
          }
          .grid-block {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .section-title {
            font-size: 30px;
          }
          .vision-card {
            padding: 30px 24px;
          }
          .vision-quote {
            font-size: 18px;
          }
        }
      `}</style>
      
      <div className="container">
        <div className="grid-block">
          <div className="text-side">
            <span className="section-badge">What is NextGen?</span>
            <h2 className="section-title">Bridging Academics and the Professional World</h2>
            <p className="section-desc">
              Skill Jobs NextGen is the official student community and campus leadership platform of Skill Jobs. We believe that classroom learning is only the first step. To thrive in the competitive global economy, students need practical skills, real experience, and robust professional connections.
            </p>
            <p className="section-desc">
              Our network spans across universities, connecting students directly with mentors, workshops, and companies looking for ambitious young talent.
            </p>
          </div>
          
          <div className="vision-card">
            <h3 className="vision-quote">
              "The idea is simple: a degree alone is not enough—real-world skills, leadership confidence, and industry experience are what set you apart."
            </h3>
            <span className="vision-author">NextGen Mission Statement</span>
          </div>
        </div>
      </div>
    </section>
  );
}
