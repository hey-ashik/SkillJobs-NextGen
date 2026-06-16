'use client';

import React from 'react';
import Link from 'next/link';
import { blogsData } from '../data/blogs';

export default function BlogsSection() {
  // Show the first 3 blogs on the landing page
  const featuredBlogs = blogsData.slice(0, 3);

  return (
    <section id="blogs" className="blogs-section grid-overlay">
      <style jsx>{`
        .blogs-section {
          padding: 100px 20px;
          background: var(--color-ghost-white);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 50px;
          position: relative;
          z-index: 10;
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
          color: var(--color-blue-violet-1);
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

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .blog-card {
          background: #ffffff;
          border-radius: var(--border-radius-lg);
          border: 1px solid rgba(226, 232, 240, 0.8);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.08);
          border-color: var(--color-royal-blue-2);
        }

        .blog-cover {
          height: 180px;
          overflow: hidden;
          position: relative;
          border-bottom: 1px solid rgba(226, 232, 240, 0.6);
        }

        .blog-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .blog-card:hover .blog-cover img {
          transform: scale(1.05);
        }

        .blog-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-grow: 1;
        }

        .blog-meta {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 700;
          color: var(--color-slate-gray-1);
          text-transform: uppercase;
        }

        .blog-category {
          color: var(--color-royal-blue-1);
        }

        .blog-title {
          font-family: var(--font-plus-jakarta-sans);
          font-size: 18px;
          font-weight: 900;
          color: var(--color-dark-gray-1);
          line-height: 1.4;
        }

        .blog-excerpt {
          font-size: 14px;
          color: var(--color-dark-slate-gray-1);
          line-height: 1.6;
          flex-grow: 1;
        }

        .read-link {
          font-size: 14px;
          font-weight: 700;
          color: var(--color-dark-gray-1);
          align-self: flex-start;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          text-decoration: none;
          transition: color 0.2s;
        }

        .read-link:hover {
          color: var(--color-royal-blue-1);
        }

        @media (max-width: 900px) {
          .blogs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .blogs-grid {
            grid-template-columns: 1fr;
          }
          .section-title {
            font-size: 30px;
          }
        }
      `}</style>

      <div className="container">
        <div className="section-header">
          <span className="section-badge">Blogs & Articles</span>
          <h2 className="section-title">Latest Career Insights</h2>
        </div>

        <div className="blogs-grid">
          {featuredBlogs.map((blog, idx) => (
            <div key={idx} className="blog-card">
              <div className="blog-cover">
                <img src={blog.image} alt={blog.title} />
              </div>

              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-category">{blog.category}</span>
                  <span>{blog.readTime}</span>
                </div>
                
                <h3 className="blog-title">{blog.title}</h3>
                
                <p className="blog-excerpt">{blog.excerpt}</p>
                
                <Link href={`/blogs/${blog.slug}`} className="read-link">
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
