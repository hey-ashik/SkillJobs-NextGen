'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AuthModal from '../../components/AuthModal';
import { blogsData } from '../../data/blogs';

export default function BlogsPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredBlogs, setFilteredBlogs] = useState(blogsData);
  const [isSearching, setIsSearching] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const searchTimeoutRef = useRef(null);

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  // Categories list
  const categories = [
    'All',
    'Learning Tips',
    'Instructor Guidelines',
    'Tips and Techniques',
    'Career Growth',
    'Resume & Interviews',
    'Leadership'
  ];

  // Search and Category filtering logic with Shimmer delay
  const filterArticles = (searchVal, categoryVal) => {
    setIsSearching(true);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      let results = blogsData;

      if (categoryVal !== 'All') {
        results = results.filter(blog => blog.category.toLowerCase() === categoryVal.toLowerCase());
      }

      if (searchVal.trim() !== '') {
        results = results.filter(blog =>
          blog.title.toLowerCase().includes(searchVal.toLowerCase()) ||
          blog.category.toLowerCase().includes(searchVal.toLowerCase())
        );
      }

      setFilteredBlogs(results);
      setIsSearching(false);
    }, 500); // 500ms skeleton shimmer
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    filterArticles(val, selectedCategory);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    filterArticles(searchQuery, category);
  };

  // Featured stories (Only shown when no search query and "All" category is selected)
  const mainFeatured = blogsData[0];
  const sideFeatured = blogsData.slice(1, 4);

  // Top Writers mock data
  const topWriters = [
    { name: 'Dm. Mehedi Hasan', role: 'Career Coach', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&h=60&q=80', count: 3 },
    { name: 'Ahemed Shamim', role: 'HR Specialist', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&h=60&q=80', count: 3 },
    { name: 'Khondker Mohammad', role: 'Creator Lead', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=60&h=60&q=80', count: 3 }
  ];

  // Popular This Week mock data
  const popularBlogs = blogsData.slice(2, 5);

  return (
    <>
      <Header onOpenAuth={openAuth} />

      <main className="blogs-page-container">
        <style jsx>{`
          .blogs-page-container {
            background: #f8fafc;
            min-height: 100vh;
            padding: 140px 20px 80px; /* Safe space below glass header */
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 48px;
          }

          /* 1. Top Search and Title Area */
          .search-hero-section {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            max-width: 800px;
            margin: 0 auto;
          }

          .search-hero-title {
            font-family: var(--font-plus-jakarta-sans), sans-serif;
            font-size: 38px;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: -1px;
          }

          .search-hero-desc {
            font-family: var(--font-inter), sans-serif;
            font-size: 15px;
            color: #64748b;
            line-height: 1.6;
          }

          .search-box-wrapper {
            position: relative;
            width: 100%;
            max-width: 580px;
            margin-top: 10px;
          }

          .search-input-field {
            width: 100%;
            padding: 14px 24px 14px 50px;
            border-radius: 9999px;
            border: 1px solid #cbd5e1;
            font-family: var(--font-inter), sans-serif;
            font-size: 15px;
            outline: none;
            transition: all 0.25s ease;
            background: #ffffff;
            box-shadow: 0 4px 15px rgba(15, 23, 42, 0.03);
          }

          .search-input-field:focus {
            border-color: #1b4d9b;
            box-shadow: 0 10px 25px rgba(27, 77, 155, 0.08);
          }

          .search-icon {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            font-size: 16px;
          }

          /* Category Pill Filters (Clean Light Style) */
          .category-pills-row {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
            width: 100%;
          }

          .category-pill {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            padding: 8px 18px;
            border-radius: 9999px;
            font-family: var(--font-inter), sans-serif;
            font-size: 13px;
            font-weight: 700;
            color: #475569;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 2px 4px rgba(15, 23, 42, 0.01);
          }

          .category-pill:hover {
            border-color: #cbd5e1;
            color: #0f172a;
          }

          .category-pill.active {
            background: #1b4d9b;
            border-color: #1b4d9b;
            color: #ffffff;
            box-shadow: 0 4px 10px rgba(27, 77, 155, 0.15);
          }

          /* 2. Featured Stories Section (Contained Grid, 2nd Image Style) */
          .featured-section {
            display: flex;
            flex-direction: column;
            gap: 20px;
            border-top: 1px solid #e2e8f0;
            padding-top: 40px;
          }

          .section-main-title {
            font-family: var(--font-plus-jakarta-sans), sans-serif;
            font-size: 24px;
            font-weight: 900;
            color: #0f172a;
          }

          .section-subtitle {
            font-family: var(--font-inter), sans-serif;
            font-size: 14px;
            color: #64748b;
            margin-top: 2px;
          }

          .featured-grid {
            display: grid;
            grid-template-columns: 1.6fr 1fr;
            gap: 24px;
          }

          /* Contained Left Featured Card */
          :global(.large-featured-card) {
            background: #ffffff;
            border: 1px solid rgba(226, 232, 240, 0.8);
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            position: relative;
            height: 420px; /* Bounded height */
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
            transition: all 0.3s ease;
            text-decoration: none;
          }

          :global(.large-featured-card:hover) {
            transform: translateY(-4px);
            box-shadow: 0 15px 30px rgba(15, 23, 42, 0.08);
          }

          .large-featured-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
          }

          .large-featured-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 70%;
            background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0) 100%);
            z-index: 2;
          }

          .large-featured-content {
            position: relative;
            z-index: 3;
            padding: 30px;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .large-badge {
            background: #e11d48;
            color: #ffffff;
            font-size: 11px;
            font-weight: 800;
            padding: 4px 10px;
            border-radius: 6px;
            text-transform: uppercase;
          }

          .large-title {
            font-family: var(--font-plus-jakarta-sans), sans-serif;
            font-size: 24px;
            font-weight: 900;
            line-height: 1.3;
          }

          .large-excerpt {
            font-size: 14px;
            opacity: 0.85;
            line-height: 1.5;
            max-width: 90%;
          }

          .large-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 10px;
            width: 100%;
          }

          .author-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.5);
            object-fit: cover;
          }

          .author-info {
            display: flex;
            flex-direction: column;
            font-size: 12px;
          }

          .author-name {
            font-weight: 700;
          }

          .author-date {
            opacity: 0.7;
          }

          .views-badge {
            margin-left: auto;
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            opacity: 0.8;
          }

          /* Small Right List */
          .side-featured-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          :global(.side-featured-card) {
            background: #ffffff;
            border: 1px solid rgba(226, 232, 240, 0.8);
            border-radius: 16px;
            padding: 16px;
            display: flex;
            gap: 16px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.01);
            align-items: center;
            text-decoration: none;
            transition: all 0.25s ease;
          }

          :global(.side-featured-card:hover) {
            transform: translateY(-2px);
            border-color: rgba(27, 77, 155, 0.2);
            box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
          }

          .side-img-wrapper {
            width: 100px;
            height: 85px;
            border-radius: 10px;
            overflow: hidden;
            flex-shrink: 0;
          }

          .side-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .side-content {
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
          }

          .side-badge {
            color: #1b4d9b;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
          }

          .side-title {
            font-family: var(--font-plus-jakarta-sans), sans-serif;
            font-size: 14px;
            font-weight: 800;
            color: #0f172a;
            line-height: 1.35;
          }

          .side-meta {
            font-size: 11px;
            color: #94a3b8;
            font-weight: 600;
          }

          /* Two-Column Grid: Articles and Sidebar Widgets */
          .main-content-layout {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 30px;
            border-top: 1px solid #e2e8f0;
            padding-top: 40px;
          }

          .articles-list-container {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          /* Latest Articles Header (2nd/3rd Image Style) */
          .articles-list-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 16px;
          }

          .toggle-buttons {
            display: flex;
            gap: 8px;
          }

          .toggle-btn {
            background: #ffffff;
            border: 1px solid #cbd5e1;
            padding: 8px;
            border-radius: 8px;
            cursor: pointer;
            color: #64748b;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
          }

          .toggle-btn.active {
            background: #e2e8f0;
            border-color: #94a3b8;
            color: #0f172a;
          }

          /* Grid View Columns */
          .latest-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          :global(.latest-card) {
            background: #ffffff;
            border: 1px solid rgba(226, 232, 240, 0.8);
            border-radius: 16px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            text-decoration: none;
            transition: all 0.3s ease;
          }

          :global(.latest-card:hover) {
            transform: translateY(-4px);
            box-shadow: 0 10px 20px rgba(15, 23, 42, 0.04);
            border-color: rgba(27, 77, 155, 0.2);
          }

          .latest-cover {
            height: 160px;
            width: 100%;
            overflow: hidden;
            border-bottom: 1px solid rgba(226, 232, 240, 0.6);
          }

          .latest-cover img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .latest-body {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            flex: 1;
          }

          .latest-category {
            color: #1b4d9b;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
          }

          .latest-title {
            font-family: var(--font-plus-jakarta-sans), sans-serif;
            font-size: 16px;
            font-weight: 800;
            color: #0f172a;
            line-height: 1.4;
          }

          .latest-excerpt {
            font-size: 13px;
            color: #64748b;
            line-height: 1.5;
          }

          .latest-footer {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: auto;
            padding-top: 12px;
            border-top: 1px solid #f1f5f9;
          }

          .latest-author-avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            object-fit: cover;
          }

          .latest-author-name {
            font-size: 11px;
            font-weight: 700;
            color: #475569;
          }

          .latest-meta {
            margin-left: auto;
            font-size: 11px;
            color: #94a3b8;
            font-weight: 600;
          }

          /* List View Style (Horizontal list card, 3rd Image Style) */
          .latest-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          :global(.latest-list-card) {
            background: #ffffff;
            border: 1px solid rgba(226, 232, 240, 0.8);
            border-radius: 16px;
            padding: 20px;
            display: flex;
            gap: 24px;
            text-decoration: none;
            transition: all 0.25s ease;
            align-items: center;
          }

          :global(.latest-list-card:hover) {
            transform: translateY(-2px);
            border-color: rgba(27, 77, 155, 0.2);
            box-shadow: 0 10px 20px rgba(15, 23, 42, 0.04);
          }

          .latest-list-cover {
            width: 180px;
            height: 120px;
            border-radius: 12px;
            overflow: hidden;
            flex-shrink: 0;
          }

          .latest-list-cover img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .latest-list-body {
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex: 1;
          }

          /* Sidebar Styling */
          .sidebar {
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

          /* Popular This Week widget */
          .popular-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          :global(.popular-item) {
            display: flex;
            gap: 12px;
            text-decoration: none;
          }

          .popular-img {
            width: 50px;
            height: 50px;
            border-radius: 8px;
            object-fit: cover;
            flex-shrink: 0;
          }

          .popular-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .popular-title {
            font-family: var(--font-inter), sans-serif;
            font-size: 12px;
            font-weight: 700;
            color: #1e293b;
            line-height: 1.35;
          }

          .popular-meta {
            font-size: 10px;
            color: #94a3b8;
          }

          /* Top Writers widget */
          .writers-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .writer-item {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .writer-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
          }

          .writer-info {
            display: flex;
            flex-direction: column;
          }

          .writer-name {
            font-size: 13px;
            font-weight: 800;
            color: #1e293b;
          }

          .writer-role {
            font-size: 11px;
            color: #64748b;
          }

          .writer-count {
            margin-left: auto;
            background: #f1f5f9;
            color: #475569;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 8px;
            border-radius: 6px;
          }

          /* Shimmer Skeleton Screen styling (Loop delay effect) */
          .skeleton-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            width: 100%;
          }

          .skeleton-card {
            background: #ffffff;
            border: 1px solid rgba(226, 232, 240, 0.8);
            border-radius: 16px;
            overflow: hidden;
            min-height: 280px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .shimmer {
            background: #e2e8f0;
            background-image: linear-gradient(
              90deg,
              #e2e8f0 25%,
              #f1f5f9 50%,
              #e2e8f0 75%
            );
            background-size: 200% 100%;
            animation: shimmer-animation 1.5s infinite;
            border-radius: 8px;
          }

          @keyframes shimmer-animation {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          .shimmer-cover {
            height: 120px;
            width: 100%;
          }

          .shimmer-line {
            height: 16px;
            width: 80%;
          }

          .shimmer-line-short {
            height: 12px;
            width: 50%;
          }

          .shimmer-avatar {
            width: 28px;
            height: 28px;
            border-radius: 50%;
          }

          @media (max-width: 1024px) {
            .main-content-layout {
              grid-template-columns: 1fr;
            }
            .sidebar {
              margin-top: 20px;
            }
          }

          @media (max-width: 768px) {
            .featured-grid {
              grid-template-columns: 1fr;
            }
            .large-featured-card {
              min-height: 300px;
            }
            .latest-grid, .skeleton-grid {
              grid-template-columns: 1fr;
            }
            .latest-list-card {
              flex-direction: column;
              align-items: stretch;
            }
            .latest-list-cover {
              width: 100%;
              height: 160px;
            }
          }
        `}</style>

        <div className="container">
          
          {/* Top Search Hero Section */}
          <section className="search-hero-section">
            <h1 className="search-hero-title">Blogs & Career Insights</h1>
            <p className="search-hero-desc">
              Explore resources, study guides, and leadership tips curated to accelerate your corporate career.
            </p>
            
            <div className="search-box-wrapper">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input 
                type="text" 
                placeholder="Search publications by title or category..." 
                className="search-input-field"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            {/* Category Pills (Clean design directly below Search) */}
            <div className="category-pills-row">
              {categories.map((cat, idx) => (
                <button 
                  key={idx} 
                  className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* Featured Stories (Only visible when not filtering or searching, exactly like 2nd Image) */}
          {!searchQuery && selectedCategory === 'All' && (
            <section className="featured-section">
              <div className="section-title-wrapper">
                <h2 className="section-main-title">Featured Stories</h2>
                <p className="section-subtitle">Hand-picked articles worth your time</p>
              </div>

              <div className="featured-grid">
                {/* Large Contained Card */}
                <Link href={`/blogs/${mainFeatured.slug}`} className="large-featured-card">
                  <img src={mainFeatured.image} alt={mainFeatured.title} className="large-featured-img" />
                  <div className="large-featured-overlay"></div>
                  <div className="large-featured-content">
                    <span className="large-badge">{mainFeatured.category}</span>
                    <h3 className="large-title">{mainFeatured.title}</h3>
                    <p className="large-excerpt">{mainFeatured.excerpt}</p>
                    <div className="large-meta">
                      <img src={mainFeatured.author.avatar} alt={mainFeatured.author.name} className="author-avatar" />
                      <div className="author-info">
                        <span className="author-name">{mainFeatured.author.name}</span>
                        <span className="author-date">{mainFeatured.date}</span>
                      </div>
                      <span className="views-badge">
                        <i className="fa-regular fa-eye"></i> {mainFeatured.views}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Vertical Small Featured List */}
                <div className="side-featured-list">
                  {sideFeatured.map((blog, idx) => (
                    <Link key={idx} href={`/blogs/${blog.slug}`} className="side-featured-card">
                      <div className="side-img-wrapper">
                        <img src={blog.image} alt={blog.title} className="side-img" />
                      </div>
                      <div className="side-content">
                        <span className="side-badge">{blog.category}</span>
                        <h4 className="side-title">{blog.title}</h4>
                        <span className="side-meta">{blog.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Two-Column Grid: Articles List & Sidebar widgets */}
          <div className="main-content-layout">
            
            {/* Left Area: Articles List */}
            <div className="articles-list-container">
              <div className="articles-list-header">
                <div>
                  <h2 className="section-main-title">
                    {searchQuery || selectedCategory !== 'All' 
                      ? `Filter Results (${filteredBlogs.length})` 
                      : 'Latest Articles'}
                  </h2>
                  <p className="section-subtitle">
                    {filteredBlogs.length} articles available
                  </p>
                </div>

                <div className="toggle-buttons">
                  <button 
                    className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid View"
                  >
                    <i className="fa-solid fa-table-cells-large"></i>
                  </button>
                  <button 
                    className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List View"
                  >
                    <i className="fa-solid fa-list"></i>
                  </button>
                </div>
              </div>

              {/* Shimmer skeleton screen while filtering/searching */}
              {isSearching ? (
                <div className="skeleton-grid">
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} className="skeleton-card">
                      <div className="shimmer shimmer-cover"></div>
                      <div className="shimmer shimmer-line"></div>
                      <div className="shimmer shimmer-line-short"></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 'auto' }}>
                        <div className="shimmer shimmer-avatar"></div>
                        <div className="shimmer shimmer-line-short" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div style={{ padding: '60px 20px', textAlign: 'center', background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                  <i className="fa-regular fa-folder-open" style={{ fontSize: '48px', color: '#94a3b8', marginBottom: '16px' }}></i>
                  <h3 style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontWeight: 800, color: '#0f172a' }}>No publications found</h3>
                  <p style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>Try selecting a different filter or search term</p>
                </div>
              ) : viewMode === 'grid' ? (
                /* Grid View Columns */
                <div className="latest-grid">
                  {filteredBlogs.map((blog, idx) => (
                    <Link key={idx} href={`/blogs/${blog.slug}`} className="latest-card">
                      <div className="latest-cover">
                        <img src={blog.image} alt={blog.title} />
                      </div>
                      <div className="latest-body">
                        <span className="latest-category">{blog.category}</span>
                        <h3 className="latest-title">{blog.title}</h3>
                        <p className="latest-excerpt">{blog.excerpt}</p>
                        <div className="latest-footer">
                          <img src={blog.author.avatar} alt={blog.author.name} className="latest-author-avatar" />
                          <span className="latest-author-name">{blog.author.name}</span>
                          <span className="latest-meta">{blog.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                /* List View Columns */
                <div className="latest-list">
                  {filteredBlogs.map((blog, idx) => (
                    <Link key={idx} href={`/blogs/${blog.slug}`} className="latest-list-card">
                      <div className="latest-list-cover">
                        <img src={blog.image} alt={blog.title} />
                      </div>
                      <div className="latest-list-body">
                        <span className="latest-category">{blog.category}</span>
                        <h3 className="latest-title" style={{ fontSize: '18px' }}>{blog.title}</h3>
                        <p className="latest-excerpt">{blog.excerpt}</p>
                        <div className="latest-footer" style={{ border: 'none', paddingTop: 0 }}>
                          <img src={blog.author.avatar} alt={blog.author.name} className="latest-author-avatar" />
                          <span className="latest-author-name">{blog.author.name}</span>
                          <span className="latest-meta">{blog.date} &bull; {blog.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Right Area: Sidebar Widgets */}
            <div className="sidebar">
              {/* Popular This Week widget */}
              <div className="sidebar-card">
                <h3 className="sidebar-title">Popular This Week</h3>
                <div className="popular-list">
                  {popularBlogs.map((blog, idx) => (
                    <Link key={idx} href={`/blogs/${blog.slug}`} className="popular-item">
                      <img src={blog.image} alt={blog.title} className="popular-img" />
                      <div className="popular-info">
                        <h4 className="popular-title">{blog.title}</h4>
                        <span className="popular-meta">{blog.readTime} &bull; {blog.views} views</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Top Writers widget */}
              <div className="sidebar-card">
                <h3 className="sidebar-title">Top Writers</h3>
                <div className="writers-list">
                  {topWriters.map((writer, idx) => (
                    <div key={idx} className="writer-item">
                      <img src={writer.avatar} alt={writer.name} className="writer-avatar" />
                      <div className="writer-info">
                        <span className="writer-name">{writer.name}</span>
                        <span className="writer-role">{writer.role}</span>
                      </div>
                      <span className="writer-count">{writer.count} posts</span>
                    </div>
                  ))}
                </div>
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
