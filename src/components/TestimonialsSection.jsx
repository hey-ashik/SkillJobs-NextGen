import React from 'react';

const testimonials = [
  {
    quote: "Being a NextGen Campus Ambassador at my university completely transformed my confidence. I managed events of over 500 students, and the experience helped me secure my dream internship before graduating.",
    name: "Sadia Rahman",
    role: "Campus Ambassador, DU",
    avatarColor: "var(--color-royal-blue-2)"
  },
  {
    quote: "NextGen career workshops gave me practical knowledge that my textbooks couldn't provide. The CV review sessions helped me restructure my portfolio, which got me noticed by major tech companies.",
    name: "Tanvir Ahmed",
    role: "Software Engineering Student",
    avatarColor: "var(--color-medium-purple)"
  },
  {
    quote: "As a mentor, I have watched students evolve from shy participants into confident presenters and leaders. Skill Jobs NextGen bridges the critical skills gap that companies look for in fresh graduates.",
    name: "Farhana Islam",
    role: "HR Director & Mentor",
    avatarColor: "var(--color-deep-pink)"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <style jsx>{`
        .testimonials-section {
          padding: 100px 20px;
          background: #ffffff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 60px;
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

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .testimonial-card {
          background: var(--color-ghost-white);
          border: 1px solid rgba(226, 232, 240, 0.6);
          border-radius: var(--border-radius-lg);
          padding: 35px 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          transition: all 0.3s;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.03);
          border-color: var(--color-lavender-2);
        }

        .quote-icon {
          position: absolute;
          top: 25px;
          right: 30px;
          font-size: 48px;
          color: rgba(124, 90, 246, 0.1);
          font-family: Georgia, serif;
          line-height: 1;
        }

        .quote-text {
          font-family: var(--font-inter);
          font-size: 15px;
          line-height: 1.7;
          color: var(--color-dark-slate-gray-1);
          position: relative;
          z-index: 10;
        }

        .profile-box {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
        }

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 800;
          font-size: 16px;
        }

        .meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .name {
          font-family: var(--font-plus-jakarta-sans);
          font-size: 15px;
          font-weight: 900;
          color: var(--color-dark-gray-1);
        }

        .role {
          font-size: 12px;
          color: var(--color-slate-gray-1);
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          .section-title {
            font-size: 30px;
          }
        }
      `}</style>

      <div className="container">
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">What Our Community Says</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="quote-icon">“</div>
              <p className="quote-text">"{t.quote}"</p>
              
              <div className="profile-box">
                <div className="avatar" style={{ backgroundColor: t.avatarColor }}>
                  {t.name[0]}
                </div>
                <div className="meta">
                  <span className="name">{t.name}</span>
                  <span className="role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
