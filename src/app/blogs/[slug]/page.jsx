'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AuthModal from '../../../components/AuthModal';
import { blogsData } from '../../../data/blogs';

export default function BlogDetailsPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const params = useParams();
  const slug = params?.slug;

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  // Find corresponding blog post
  const blog = blogsData.find(post => post.slug === slug) || blogsData[0];

  // More articles list (excluding the current one)
  const relatedBlogs = blogsData.filter(post => post.slug !== slug).slice(0, 4);

  return (
    <>
      <Header onOpenAuth={openAuth} />

      <main className="details-page-container">
        <style jsx>{`
          .details-page-container {
            background: #f8fafc;
            min-height: 100vh;
            padding: 120px 20px 80px;
          }

          .container {
            max-width: 1100px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 320px;
            gap: 40px;
          }

          /* Main Article Area */
          .article-wrapper {
            background: #ffffff;
            border: 1px solid rgba(226, 232, 240, 0.8);
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.02);
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          :global(.back-link) {
            font-family: var(--font-inter), sans-serif;
            font-size: 14px;
            font-weight: 700;
            color: #1b4d9b;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            align-self: flex-start;
          }

          :global(.back-link:hover) {
            color: #e11d48;
          }

          .article-header {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .category-tag {
            align-self: flex-start;
            background: rgba(27, 77, 155, 0.06);
            color: #1b4d9b;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            padding: 6px 12px;
            border-radius: 8px;
          }

          .article-title {
            font-family: var(--font-plus-jakarta-sans), sans-serif;
            font-size: 36px;
            font-weight: 900;
            color: #0f172a;
            line-height: 1.25;
            letter-spacing: -1px;
          }

          .meta-row {
            display: flex;
            align-items: center;
            gap: 16px;
            border-top: 1px solid #f1f5f9;
            border-bottom: 1px solid #f1f5f9;
            padding: 16px 0;
            margin-top: 10px;
          }

          .author-img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            object-fit: cover;
          }

          .author-meta {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .author-name {
            font-family: var(--font-inter), sans-serif;
            font-size: 14px;
            font-weight: 800;
            color: #1e293b;
          }

          .author-role {
            font-size: 11px;
            color: #64748b;
          }

          .reading-stats {
            margin-left: auto;
            display: flex;
            align-items: center;
            gap: 16px;
            font-size: 13px;
            color: #64748b;
            font-weight: 500;
          }

          .featured-cover-wrapper {
            width: 100%;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(226, 232, 240, 0.8);
          }

          .featured-cover {
            width: 100%;
            height: auto;
            max-height: 400px;
            object-fit: cover;
            display: block;
          }

          /* Rich Body Content Style */
          .article-body {
            font-family: var(--font-inter), sans-serif;
            font-size: 16px;
            color: #334155;
            line-height: 1.8;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .article-body :global(h3) {
            font-family: var(--font-plus-jakarta-sans), sans-serif;
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            margin-top: 20px;
          }

          .article-body :global(p) {
            margin: 0;
          }

          .article-body :global(blockquote) {
            border-left: 4px solid #1b4d9b;
            padding: 10px 20px;
            background: #f8fafc;
            font-style: italic;
            font-size: 17px;
            color: #475569;
            margin: 20px 0;
            font-weight: 500;
          }

          .article-body :global(ul) {
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          /* Right Sidebar styling */
          .details-sidebar {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .sidebar-card {
            background: #ffffff;
            border: 1px solid rgba(226, 232, 240, 0.8);
            border-radius: 20px;
            padding: 24px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.01);
          }

          .sidebar-title {
            font-family: var(--font-plus-jakarta-sans), sans-serif;
            font-size: 16px;
            font-weight: 900;
            color: #0f172a;
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 12px;
            margin-bottom: 16px;
          }

          .related-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          :global(.related-item) {
            display: flex;
            gap: 12px;
            text-decoration: none;
            align-items: center;
          }

          .related-img-wrapper {
            width: 70px;
            height: 60px;
            border-radius: 8px;
            overflow: hidden;
            flex-shrink: 0;
          }

          .related-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .related-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .related-item-title {
            font-family: var(--font-inter), sans-serif;
            font-size: 13px;
            font-weight: 700;
            color: #1e293b;
            line-height: 1.35;
          }

          .related-meta {
            font-size: 10px;
            color: #94a3b8;
          }

          /* Sharing panel widgets */
          .share-buttons {
            display: flex;
            gap: 10px;
            margin-top: 12px;
          }

          .share-btn {
            flex: 1;
            padding: 10px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
            background: #ffffff;
            color: #64748b;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .share-btn:hover {
            background: #f8fafc;
            color: #1b4d9b;
            border-color: #cbd5e1;
          }

          @media (max-width: 1024px) {
            .container {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 768px) {
            .details-page-container {
              padding: 100px 15px 60px;
            }
            .article-wrapper {
              padding: 24px;
            }
            .article-title {
              font-size: 26px;
            }
            .meta-row {
              flex-wrap: wrap;
              gap: 12px;
            }
            .reading-stats {
              margin-left: 0;
              width: 100%;
              border-top: 1px dashed #f1f5f9;
              padding-top: 10px;
            }
          }
        `}</style>

        <div className="container">
          {/* Article wrapper block */}
          <div className="article-wrapper">
            <Link href="/blogs" className="back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Publications
            </Link>

            <div className="article-header">
              <span className="category-tag">{blog.category}</span>
              <h1 className="article-title">{blog.title}</h1>
            </div>

            <div className="meta-row">
              <img src={blog.author.avatar} alt={blog.author.name} className="author-img" />
              <div className="author-meta">
                <span className="author-name">{blog.author.name}</span>
                <span className="author-role">{blog.author.role}</span>
              </div>
              <div className="reading-stats">
                <span><i className="fa-regular fa-calendar-days"></i> {blog.date}</span>
                <span><i className="fa-regular fa-clock"></i> {blog.readTime}</span>
                <span><i className="fa-regular fa-eye"></i> {blog.views} views</span>
              </div>
            </div>

            <div className="featured-cover-wrapper">
              <img src={blog.image} alt={blog.title} className="featured-cover" />
            </div>

            <div className="article-body" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </div>

          {/* Right Area: Sidebar Panels */}
          <div className="details-sidebar">
            {/* Related Articles list */}
            <div className="sidebar-card">
              <h3 className="sidebar-title">More Articles</h3>
              <div className="related-list">
                {relatedBlogs.map((post, idx) => (
                  <Link key={idx} href={`/blogs/${post.slug}`} className="related-item">
                    <div className="related-img-wrapper">
                      <img src={post.image} alt={post.title} className="related-img" />
                    </div>
                    <div className="related-info">
                      <h4 className="related-item-title">{post.title}</h4>
                      <span className="related-meta">{post.readTime} &bull; {post.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sharing Panel */}
            <div className="sidebar-card">
              <h3 className="sidebar-title">Share Publication</h3>
              <div className="share-buttons">
                <button className="share-btn" onClick={() => alert('Copied to Clipboard')} aria-label="Copy Link">
                  <i className="fa-solid fa-link"></i>
                </button>
                <button className="share-btn" onClick={() => window.open('https://facebook.com')} aria-label="Share on Facebook">
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button className="share-btn" onClick={() => window.open('https://twitter.com')} aria-label="Share on Twitter">
                  <i className="fa-brands fa-x-twitter"></i>
                </button>
                <button className="share-btn" onClick={() => window.open('https://linkedin.com')} aria-label="Share on LinkedIn">
                  <i className="fa-brands fa-linkedin-in"></i>
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      <AuthModal isOpen={isAuthOpen} onClose={closeAuth} />
    </>
  );
}
