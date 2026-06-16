'use client';

import React, { useEffect, useRef, useState } from 'react';

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
  },
  {
    icon: 'fa-solid fa-file-invoice',
    title: 'CV Review & Prep',
    color: '#6366f1',
    bgColor: 'rgba(99, 102, 241, 0.08)'
  },
  {
    icon: 'fa-solid fa-comments',
    title: 'Mock Interviews',
    color: '#f97316',
    bgColor: 'rgba(249, 115, 22, 0.08)'
  },
  {
    icon: 'fa-solid fa-users',
    title: 'Youth Employability',
    color: '#0d9488',
    bgColor: 'rgba(13, 148, 136, 0.08)'
  },
  {
    icon: 'fa-solid fa-ranking-star',
    title: 'Leadership Development',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.08)'
  },
  {
    icon: 'fa-solid fa-chalkboard-user',
    title: 'Expert Mentorship',
    color: '#0284c7',
    bgColor: 'rgba(2, 132, 199, 0.08)'
  }
];

export default function ValueSnapshot() {
  const sectionRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the section is visible in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const totalScrollArea = windowHeight + rect.height;
        const currentScrollProgress = windowHeight - rect.top;
        const progress = currentScrollProgress / totalScrollArea; // 0 to 1

        // Parallax translation from right to left as user scrolls down
        // 0.5 is middle. At 0 we translate by +250px, at 1 we translate by -250px.
        const maxTranslate = 500;
        const translateVal = (0.5 - progress) * maxTranslate;
        setTranslateX(translateVal);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount

    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="snapshot-section">
      <style jsx>{`
        .snapshot-section {
          padding: 50px 0;
          background: #ffffff;
          border-top: 1px solid rgba(226, 232, 240, 0.6);
          border-bottom: 1px solid rgba(226, 232, 240, 0.6);
          position: relative;
          z-index: 20;
          overflow: hidden;
          width: 100%;
        }

        .snapshot-container {
          display: flex;
          gap: 20px;
          padding: 10px 40px;
          width: max-content;
          will-change: transform;
        }

        .snapshot-container.initialized {
          transition: transform 0.12s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .snapshot-card {
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 16px;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          width: 250px;
          flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
        }

        .snapshot-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -10px rgba(15, 23, 42, 0.1);
          border-color: #1b4d9b;
        }

        .icon-box {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          flex-shrink: 0;
        }

        .card-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: var(--color-dark-slate-gray);
          line-height: 1.3;
        }

        @media (max-width: 768px) {
          .snapshot-section {
            padding: 40px 0;
          }
          .snapshot-container {
            gap: 16px;
            padding: 10px 20px;
          }
          .snapshot-card {
            width: 220px;
            padding: 14px 18px;
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
      `}</style>
      <div 
        className={`snapshot-container ${isInitialized ? 'initialized' : 'no-transition'}`}
        style={{ transform: `translateX(${translateX}px)` }}
      >
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
