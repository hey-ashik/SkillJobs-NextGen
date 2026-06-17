'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from './Logo';
import SearchModal from './SearchModal';

export default function Header({ onOpenAuth }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

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
    setMobileMenuOpen(false);

    // If clicking a section but currently on another page, navigate to homepage section
    if (pathname !== '/') {
      // Allow default link navigation to go to /#targetId
      return;
    }

    // Otherwise, prevent default and scroll smoothly
    e.preventDefault();
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

      // Update browser history hash without jump
      window.history.pushState(null, '', `#${targetId}`);
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

        :global(.nav-link) {
          font-family: var(--font-inter), sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: var(--color-dark-slate-gray-1) !important;
          transition: color 0.2s;
          position: relative;
          cursor: pointer;
          text-decoration: none;
        }

        :global(.nav-link:hover) {
          color: var(--color-royal-blue-1) !important;
        }

        :global(.nav-link::after) {
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

        :global(.nav-link:hover::after) {
          transform: translateX(-50%) scaleX(1);
        }

        .cta-btn-desktop {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search-btn-desktop {
         
       
          color: var(--color-dark-slate-gray-1);
          width: 40px;
          height: 40px;
          
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 23px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .search-btn-desktop:hover {
          background: rgba(27, 77, 155, 0.08);
          border-color: rgba(27, 77, 155, 0.2);
          color: var(--color-royal-blue-1);
          transform: scale(1.05);
        }

        .cta-btn {
          background: #0f172a;
          color: #ffffff;
          padding: 10px 22px;
          border: none;
          border-radius: 9999px; /* Pills button */
          font-size: 14px;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
          cursor: pointer;
          transition: all 0.2s;
        }

        .cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.25);
          background: #1e293b;
        }

        .mobile-controls {
          display: none;
          align-items: center;
          gap: 16px;
          z-index: 510;
        }

        .search-btn-mobile {
          background: none;
          border: none;
          color: var(--color-dark-slate-gray-1);
          font-size: 18px;
          cursor: pointer;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }

        .search-btn-mobile:hover {
          color: var(--color-royal-blue-1);
          transform: scale(1.1);
        }

        .hamburger-btn {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 24px;
          cursor: pointer;
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

        :global(.mobile-nav-link) {
          font-size: 20px;
          font-weight: 700;
          color: var(--color-dark-slate-gray-1) !important;
          padding: 10px 0;
          border-bottom: 1px solid var(--color-white-smoke);
          cursor: pointer;
          display: block;
          text-decoration: none;
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
          .mobile-controls {
            display: flex;
          }
        }
      `}</style>

      <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
        {/* LOGO */}
        <Link href="/#home" onClick={(e) => handleNavClick(e, 'home')} style={{ display: 'flex', textDecoration: 'none' }}>
          <Logo />
        </Link>

        {/* DESKTOP NAV */}
        <ul className="nav-links">
          <li>
            <Link href="/#home" className="nav-link" onClick={(e) => handleNavClick(e, 'home')}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/#ambassador" className="nav-link" onClick={(e) => handleNavClick(e, 'ambassador')}>
              Ambassador
            </Link>
          </li>
          <li>
            <Link href="/#events" className="nav-link" onClick={(e) => handleNavClick(e, 'events')}>
              Event
            </Link>
          </li>
          <li>
            <Link href="/blogs" className="nav-link">
              Blogs
            </Link>
          </li>
          <li>
            <Link href="/#about" className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>
              About
            </Link>
          </li>
        </ul>

        {/* DESKTOP CTA */}
        <div className="cta-btn-desktop">
          <button className="search-btn-desktop" onClick={() => setIsSearchOpen(true)} aria-label="Search content">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <button className="cta-btn" onClick={onOpenAuth}>
            Get Started
          </button>
        </div>

        {/* MOBILE CONTROLS (SEARCH & HAMBURGER) */}
        <div className="mobile-controls">
          <button className="search-btn-mobile" onClick={() => setIsSearchOpen(true)} aria-label="Search content">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <div
            className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li>
            <Link href="/#home" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'home')}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/#ambassador" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'ambassador')}>
              Ambassador
            </Link>
          </li>
          <li>
            <Link href="/#events" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'events')}>
              Event
            </Link>
          </li>
          <li>
            <Link href="/blogs" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Blogs
            </Link>
          </li>
          <li>
            <Link href="/#about" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'about')}>
              About
            </Link>
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

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
