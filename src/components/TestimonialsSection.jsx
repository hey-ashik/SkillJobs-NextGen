import React from 'react';

const testimonials = [
  {
    quote: "Being a NextGen Campus Ambassador at my university completely transformed my confidence. I managed events of over 500 students, and the experience helped me secure my dream internship before graduating.",
    name: "Sadia Rahman",
    role: "Campus Ambassador, DU",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    quote: "NextGen career workshops gave me practical knowledge that my textbooks couldn't provide. The CV review sessions helped me restructure my portfolio, which got me noticed by major tech companies.",
    name: "Tanvir Ahmed",
    role: "Software Engineering Student",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    quote: "As a mentor, I have watched students evolve from shy participants into confident presenters and leaders. Skill Jobs NextGen bridges the critical skills gap that companies look for in fresh graduates.",
    name: "Farhana Islam",
    role: "HR Director & Mentor",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80"
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
          overflow: hidden;
          background: #e2e8f0;
          border: 1.5px solid #ffffff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
                <div className="avatar">
                  <img src={t.avatar} alt={t.name} />
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
