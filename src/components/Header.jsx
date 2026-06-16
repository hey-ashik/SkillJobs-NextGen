'use client';

import React, { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Header({ onOpenAuth }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; // Offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="header-wrapper">
      <style jsx>{`
        .header-wrapper {
          width: 100%;
          position: relative;
        }

        .navbar-container {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1200px;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 9999px; /* Rounded corners */
          z-index: 500;
          padding: 10px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar-container.scrolled {
          top: 12px;
          width: 95%;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
          border-color: rgba(255, 255, 255, 0.7);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          font-family: var(--font-inter);
          font-size: 15px;
          font-weight: 600;
          color: var(--color-dark-slate-gray-1);
          transition: color 0.2s;
          position: relative;
          cursor: pointer;
        }

        .nav-link:hover {
          color: var(--color-royal-blue-1);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 16px;
          height: 2px;
          background: var(--color-royal-blue-1);
          border-radius: 2px;
          transition: transform 0.25s ease;
        }

        .nav-link:hover::after {
          transform: translateX(-50%) scaleX(1);
        }

        .cta-btn {
          background: var(--gradient-linear-1);
          color: var(--color-white);
          padding: 10px 22px;
          border: none;
          border-radius: 9999px; /* Pills button */
          font-size: 14px;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
          cursor: pointer;
          transition: all 0.2s;
        }

        .cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
        }

        .hamburger-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          width: 24px;
          cursor: pointer;
          z-index: 510;
        }

        .hamburger-bar {
          height: 2.5px;
          width: 100%;
          background: var(--color-dark-slate-gray-1);
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hamburger-btn.open .hamburger-bar:nth-child(1) {
          transform: translateY(7.5px) rotate(45deg);
        }
        
        .hamburger-btn.open .hamburger-bar:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger-btn.open .hamburger-bar:nth-child(3) {
          transform: translateY(-7.5px) rotate(-45deg);
        }

        /* Mobile Menu Drawer */
        .mobile-menu-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 100vw;
          height: 100vh;
          background: #ffffff;
          z-index: 450;
          padding: 120px 30px 40px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: -10px 0 30px rgba(0,0,0,0.05);
        }

        .mobile-menu-drawer.open {
          transform: translateX(0);
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mobile-nav-link {
          font-size: 20px;
          font-weight: 700;
          color: var(--color-dark-slate-gray-1);
          padding: 10px 0;
          border-bottom: 1px solid var(--color-white-smoke);
          cursor: pointer;
          display: block;
        }

        @media (max-width: 900px) {
          .navbar-container {
            width: 95%;
            top: 15px;
            padding: 10px 20px;
          }
          .nav-links, .cta-btn-desktop {
            display: none;
          }
          .hamburger-btn {
            display: flex;
          }
        }
      `}</style>

      <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
        {/* LOGO */}
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} style={{ display: 'flex', textDecoration: 'none' }}>
          <Logo />
        </a>

        {/* DESKTOP NAV */}
        <ul className="nav-links">
          <li>
            <a className="nav-link" onClick={(e) => handleNavClick(e, 'home')}>
              Home
            </a>
          </li>
          <li>
            <a className="nav-link" onClick={(e) => handleNavClick(e, 'ambassador')}>
              Ambassador
            </a>
          </li>
          <li>
            <a className="nav-link" onClick={(e) => handleNavClick(e, 'events')}>
              Event
            </a>
          </li>
          <li>
            <a className="nav-link" onClick={(e) => handleNavClick(e, 'blogs')}>
              Blogs
            </a>
          </li>
          <li>
            <a className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>
              About
            </a>
          </li>
        </ul>

        {/* DESKTOP CTA */}
        <div className="cta-btn-desktop">
          <button className="cta-btn" onClick={onOpenAuth}>
            Get Started
          </button>
        </div>

        {/* HAMBURGER BUTTON */}
        <div
          className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li>
            <a className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'home')}>
              Home
            </a>
          </li>
          <li>
            <a className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'ambassador')}>
              Ambassador
            </a>
          </li>
          <li>
            <a className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'events')}>
              Event
            </a>
          </li>
          <li>
            <a className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'blogs')}>
              Blogs
            </a>
          </li>
          <li>
            <a className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'about')}>
              About
            </a>
          </li>
        </ul>
        <button
          className="cta-btn"
          style={{ width: '100%', padding: '15px', fontSize: '16px' }}
          onClick={() => {
            setMobileMenuOpen(false);
            onOpenAuth();
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
