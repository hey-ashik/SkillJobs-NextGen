'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { blogsData } from '../data/blogs';

// Predefined searchable data for non-blog content
const staticSearchData = [
  {
    type: 'program',
    title: 'Ambassador Program',
    category: 'Programs',
    excerpt: 'Represent Skill Jobs on your campus and lead a community of active learners and achievers.',
    details: 'As a Campus Ambassador, you will coordinate events, run leadership workshops, and serve as the direct bridge between Skill Jobs and your fellow university students. Build leadership and project management skills.',
    path: '/#ambassador',
    targetId: 'ambassador'
  },
  {
    type: 'program',
    title: 'Training & Workshops',
    category: 'Programs',
    excerpt: 'Join interactive career readiness masterclasses and practical skill acquisition bootcamps.',
    details: 'From coding and digital marketing to soft skills like negotiation and public speaking, our training programs are led by industry professionals to make sure you are job-market-ready.',
    path: '/#ambassador',
    targetId: 'ambassador'
  },
  {
    type: 'program',
    title: 'University Activities',
    category: 'Programs',
    excerpt: 'Engage with job fairs, career seminars, coding hackathons, and campus innovation contests.',
    details: 'We support campus clubs, build career development cells, and host large-scale university activities to activate student talent on campus.',
    path: '/#events',
    targetId: 'events'
  },
  {
    type: 'program',
    title: 'Internship Support',
    category: 'Programs',
    excerpt: 'Gain direct access to internship applications and mock interviews with top partner companies.',
    details: 'Get your CV reviewed by corporate HR leaders, practice with live mock interviews, and receive recommendation letters and internship placement support.',
    path: '/#ambassador',
    targetId: 'ambassador'
  },
  {
    type: 'page',
    title: 'What is NextGen?',
    category: 'About Us',
    excerpt: 'Skill Jobs NextGen is the official student community and campus leadership platform of Skill Jobs.',
    details: 'Bridging Academics and the Professional World. To thrive in the competitive global economy, students need practical skills, real experience, and robust professional connections.',
    path: '/#about',
    targetId: 'about'
  },
  {
    type: 'page',
    title: 'SkillJobs NextGen Homepage',
    category: 'Home',
    excerpt: 'Official campus leadership & student community platform. Helping students improve skills, leadership, and career readiness.',
    details: 'Start your journey to employability and corporate leadership. Register to join or explore ambassador programs and events.',
    path: '/#home',
    targetId: 'home'
  }
];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Focus input on mount/open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    } else {
      setQuery('');
      setResults([]);
      setIsLoading(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Search logic with simulated loading and skeleton effect
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const delayDebounce = setTimeout(() => {
      const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
      
      // Filter static content
      const matchingStatic = staticSearchData.filter(item => {
        return searchTerms.every(term => 
          item.title.toLowerCase().includes(term) ||
          item.excerpt.toLowerCase().includes(term) ||
          item.details.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term)
        );
      });

      // Filter blogs content
      const matchingBlogs = blogsData.map(blog => ({
        type: 'blog',
        title: blog.title,
        category: blog.category || 'Blog',
        excerpt: blog.excerpt || '',
        details: blog.content || '',
        path: `/blogs/${blog.slug}`,
        targetId: null
      })).filter(item => {
        return searchTerms.every(term => 
          item.title.toLowerCase().includes(term) ||
          item.excerpt.toLowerCase().includes(term) ||
          item.details.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term)
        );
      });

      setResults([...matchingStatic, ...matchingBlogs]);
      setIsLoading(false);
    }, 450); // 450ms typing delay to display skeleton animation

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Custom click handler for smooth scrolling or navigation
  const handleResultClick = (e, item) => {
    onClose();

    if (item.targetId) {
      if (pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(item.targetId);
        if (element) {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          window.history.pushState(null, '', item.path);
        }
      } else {
        // Allow default Next.js Link behavior to navigate to homepage section
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-backdrop" onClick={handleBackdropClick}>
      <style jsx>{`
        .search-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .search-modal {
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.15),
                      0 0 1px 1px rgba(15, 23, 42, 0.05);
          width: 90%;
          max-width: 650px;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          max-height: 80vh;
          overflow: hidden;
          animation: scaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          position: relative;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px 12px;
          border-bottom: 1px solid rgba(15, 23, 42, 0.06);
        }

        .modal-title {
          font-family: var(--font-plus-jakarta-sans), sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 18px;
          color: #64748b;
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: rgba(15, 23, 42, 0.05);
          color: #0f172a;
        }

        .search-input-wrapper {
          padding: 16px 24px;
          position: relative;
        }

        .search-input-box {
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 2px solid rgba(15, 23, 42, 0.08);
          border-radius: 14px;
          padding: 12px 18px;
          transition: all 0.25s ease;
        }

        .search-input-box:focus-within {
          border-color: #1b4d9b;
          box-shadow: 0 0 0 4px rgba(27, 77, 155, 0.1);
        }

        .search-icon-inside {
          color: #94a3b8;
          font-size: 16px;
          margin-right: 12px;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-family: var(--font-inter), sans-serif;
          font-size: 16px;
          color: #0f172a;
          background: transparent;
        }

        .search-input::placeholder {
          color: #94a3b8;
        }

        .results-container {
          flex: 1;
          overflow-y: auto;
          padding: 8px 24px 24px;
          min-height: 250px;
        }

        /* Initial state & No results styling */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          text-align: center;
          height: 100%;
          min-height: 250px;
          animation: fadeIn 0.2s ease;
        }

        .empty-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: #94a3b8;
          font-size: 24px;
        }

        .empty-title {
          font-family: var(--font-plus-jakarta-sans), sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #334155;
          margin: 0 0 6px 0;
        }

        .empty-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: 14px;
          color: #64748b;
          margin: 0;
          max-width: 320px;
          line-height: 1.5;
        }

        /* Results List */
        .results-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: fadeIn 0.2s ease;
        }

        .result-item {
          display: block;
          text-decoration: none;
          padding: 16px;
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.05);
          border-radius: 16px;
          transition: all 0.2s ease;
        }

        .result-item:hover {
          transform: translateY(-2px);
          border-color: rgba(27, 77, 155, 0.15);
          box-shadow: 0 10px 20px -10px rgba(27, 77, 155, 0.1);
          background: rgba(27, 77, 155, 0.01);
        }

        .result-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .result-category {
          font-family: var(--font-inter), sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 3px 8px;
          border-radius: 9999px;
        }

        .category-blog {
          background: rgba(27, 77, 155, 0.06);
          color: #1b4d9b;
        }

        .category-programs {
          background: rgba(139, 92, 246, 0.06);
          color: #8b5cf6;
        }

        .category-about-us {
          background: rgba(16, 185, 129, 0.06);
          color: #10b981;
        }

        .category-home {
          background: rgba(244, 63, 94, 0.06);
          color: #f43f5e;
        }

        .result-title {
          font-family: var(--font-plus-jakarta-sans), sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          flex-grow: 1;
        }

        .result-excerpt {
          font-family: var(--font-inter), sans-serif;
          font-size: 13px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        /* Skeleton Shimmer Loading Effect */
        .skeleton-item {
          padding: 16px;
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.04);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .skeleton-badge {
          width: 80px;
          height: 16px;
          background: #f1f5f9;
          border-radius: 9999px;
          position: relative;
          overflow: hidden;
        }

        .skeleton-title {
          width: 60%;
          height: 18px;
          background: #f1f5f9;
          border-radius: 6px;
          position: relative;
          overflow: hidden;
        }

        .skeleton-text {
          width: 90%;
          height: 14px;
          background: #f1f5f9;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }

        /* Shimmer effect bar */
        .shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.6) 20%,
            rgba(255, 255, 255, 0.6) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer-load 1.3s infinite;
        }

        @keyframes shimmer-load {
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 768px) {
          .search-modal {
            max-height: 85vh;
            border-radius: 20px;
            width: 95%;
          }
          .modal-header {
            padding: 16px 20px 10px;
          }
          .search-input-wrapper {
            padding: 12px 20px;
          }
          .results-container {
            padding: 4px 20px 20px;
          }
        }
      `}</style>

      <div className="search-modal" ref={modalRef}>
        <div className="modal-header">
          <h3 className="modal-title">Search Content</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close search">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="search-input-wrapper">
          <div className="search-input-box">
            <i className="fa-solid fa-magnifying-glass search-icon-inside"></i>
            <input
              type="text"
              ref={inputRef}
              className="search-input"
              placeholder="Search programs, events, blogs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="results-container">
          {isLoading ? (
            <div className="results-list">
              {[1, 2, 3].map((n) => (
                <div key={n} className="skeleton-item">
                  <div className="skeleton-badge shimmer"></div>
                  <div className="skeleton-title shimmer"></div>
                  <div className="skeleton-text shimmer"></div>
                </div>
              ))}
            </div>
          ) : query.trim() === '' ? (
            <div className="empty-state">
              <div className="empty-icon-wrapper">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h4 className="empty-title">Start typing to search</h4>
              <p className="empty-desc">
                Search across events, programs, blogs, leadership activities, and community updates.
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="results-list">
              {results.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.path}
                  className="result-item"
                  onClick={(e) => handleResultClick(e, item)}
                >
                  <div className="result-header">
                    <span className={`result-category category-${item.category.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.category}
                    </span>
                    <h5 className="result-title">{item.title}</h5>
                  </div>
                  <p className="result-excerpt">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon-wrapper">
                <i className="fa-solid fa-face-frown"></i>
              </div>
              <h4 className="empty-title">No results found</h4>
              <p className="empty-desc">
                We couldn't find anything matching "{query}". Try checking your spelling or search terms.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
