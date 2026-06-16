import React from 'react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <style jsx>{`
        .site-footer {
          background: var(--color-black-2);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--color-light-gray);
          padding: 80px 20px 40px;
          font-family: var(--font-inter);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 40px;
        }

        .brand-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .brand-desc {
          font-size: 14px;
          color: var(--color-dark-gray);
          line-height: 1.6;
          max-width: 280px;
        }

        .social-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .social-icon {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: var(--color-light-gray);
          transition: all 0.2s;
        }

        .social-icon:hover {
          background: var(--color-white);
          color: var(--color-black-2);
          transform: translateY(-2px);
        }

        .links-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .col-title {
          font-family: var(--font-plus-jakarta-sans);
          font-size: 15px;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .links-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          list-style: none;
        }

        .links-list a {
          font-size: 14px;
          color: var(--color-dark-gray);
          transition: color 0.2s;
        }

        .links-list a:hover {
          color: #ffffff;
        }

        .contact-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .email-link {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-royal-blue-2);
        }

        .email-link:hover {
          text-decoration: underline;
        }

        .bottom-bar {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: var(--color-dark-gray);
        }

        @media (max-width: 900px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 600px) {
          .site-footer {
            padding: 60px 20px 30px;
          }
          .grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .bottom-bar {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>
      
      <div className="container">
        <div className="grid">
          <div className="brand-col">
            <Logo light={true} />
            <p className="brand-desc">
              Skill Jobs NextGen is the official student community and campus leadership platform of Skill Jobs, preparing students for the job market.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="social-icon" aria-label="X (Twitter)"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" className="social-icon" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>
          
          <div className="links-col">
            <h4 className="col-title">About</h4>
            <ul className="links-list">
              <li><a href="#about">What is NextGen?</a></li>
              <li><a href="#ambassador">Ambassador Program</a></li>
              <li><a href="#about">Our Vision</a></li>
              <li><a href="#blogs">Blogs & Insights</a></li>
            </ul>
          </div>
          
          <div className="links-col">
            <h4 className="col-title">Programs</h4>
            <ul className="links-list">
              <li><a href="#events">Workshops</a></li>
              <li><a href="#events">Mock Interviews</a></li>
              <li><a href="#events">Career Seminars</a></li>
              <li><a href="#events">CV Review Sessions</a></li>
            </ul>
          </div>
          
          <div className="contact-col">
            <h4 className="col-title">Contact Us</h4>
            <p style={{ fontSize: '14px', color: 'var(--color-dark-gray)', lineHeight: '1.6' }}>
              Have questions or want to partner with us? Drop us an email.
            </p>
            <a href="mailto:nextgen@skill.jobs" className="email-link">
              nextgen@skill.jobs
            </a>
          </div>
        </div>
        
        <div className="bottom-bar">
          <span>&copy; {currentYear} Skill Jobs NextGen. All rights reserved.</span>
          <span>NextGen</span>
        </div>
      </div>
    </footer>
  );
}
