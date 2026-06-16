import React from 'react';

const blogsData = [
  {
    category: 'Career Growth',
    title: 'Top 10 Employability Skills Needed in 2026',
    excerpt: 'Discover the critical real-world skills, from communication to project management, that recruiters prioritize today.',
    date: 'Jun 12, 2026',
    readTime: '5 min read',
    image: 'fa-solid fa-lightbulb'
  },
  {
    category: 'Resume & Interviews',
    title: 'How to Build a High-Conversion CV as a Student',
    excerpt: 'Learn the exact resume layouts, keyword strategies, and achievements formats that pass ATS screening filters.',
    date: 'May 28, 2026',
    readTime: '4 min read',
    image: 'fa-solid fa-file-lines'
  },
  {
    category: 'Leadership',
    title: 'Why Campus Leadership Matters for Corporate Jobs',
    excerpt: 'Corporate hiring managers reveal why managing a student club or being a Campus Ambassador outweighs a perfect GPA.',
    date: 'May 15, 2026',
    readTime: '6 min read',
    image: 'fa-solid fa-crown'
  }
];

export default function BlogsSection() {
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
          background: var(--gradient-linear-6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: var(--color-royal-blue-1);
          border-bottom: 1px solid rgba(226, 232, 240, 0.6);
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

        .read-btn {
          font-size: 14px;
          font-weight: 700;
          color: var(--color-dark-gray-1);
          align-self: flex-start;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
        }

        .read-btn:hover {
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
          {blogsData.map((blog, idx) => (
            <div key={idx} className="blog-card">
              <div className="blog-cover">
                <i className={blog.image}></i>
              </div>
              
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-category">{blog.category}</span>
                  <span>{blog.readTime}</span>
                </div>
                
                <h3 className="blog-title">{blog.title}</h3>
                
                <p className="blog-excerpt">{blog.excerpt}</p>
                
                <button className="read-btn" onClick={() => alert('Simulated: Full article is available in production.')}>
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
