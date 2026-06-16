import React from 'react';

export default function CTASection({ onOpenAuth }) {
  return (
    <section className="cta-section">
      <style jsx>{`
        .cta-section {
          padding: 100px 20px;
          background: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .cta-banner {
          width: 100%;
          max-width: 1100px;
          background: var(--gradient-linear-9);
          border-radius: 28px;
          padding: 80px 40px;
          text-align: center;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          box-shadow: 0 20px 40px -10px rgba(79, 70, 229, 0.3);
          position: relative;
          overflow: hidden;
        }

        /* Abstract glowing blobs for premium design */
        .glow-blob {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          filter: blur(50px);
          pointer-events: none;
        }

        .glow-1 {
          top: -100px;
          left: -100px;
        }

        .glow-2 {
          bottom: -100px;
          right: -100px;
        }

        .cta-title {
          font-family: var(--font-plus-jakarta-sans);
          font-size: 42px;
          font-weight: 900;
          line-height: 1.2;
          max-width: 700px;
          position: relative;
          z-index: 10;
        }

        .cta-desc {
          font-family: var(--font-inter);
          font-size: 17px;
          line-height: 1.6;
          max-width: 550px;
          color: rgba(255, 255, 255, 0.85);
          position: relative;
          z-index: 10;
        }

        .cta-btn {
          background: #ffffff;
          color: var(--color-royal-blue-1);
          padding: 18px 48px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 800;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 10;
        }

        .cta-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
          color: var(--color-blue-violet-1);
        }

        @media (max-width: 768px) {
          .cta-banner {
            padding: 60px 20px;
            border-radius: 20px;
          }
          .cta-title {
            font-size: 30px;
          }
          .cta-desc {
            font-size: 15px;
          }
          .cta-btn {
            padding: 15px 36px;
            font-size: 15px;
            width: 100%;
          }
        }
      `}</style>
      
      <div className="cta-banner">
        <div className="glow-blob glow-1"></div>
        <div className="glow-blob glow-2"></div>
        
        <h2 className="cta-title">Ready to Kickstart Your Career Journey?</h2>
        <p className="cta-desc">
          Join Skill Jobs NextGen today to develop hands-on leadership skills, attend high-quality workshops, and access premium corporate internship opportunities.
        </p>
        <button className="cta-btn" onClick={onOpenAuth}>
          Start Your Journey Today
        </button>
      </div>
    </section>
  );
}
