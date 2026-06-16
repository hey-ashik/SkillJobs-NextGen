'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ValueSnapshot from '../components/ValueSnapshot';
import TrustSection from '../components/TrustSection';
import AboutSection from '../components/AboutSection';
import ProgramsSection from '../components/ProgramsSection';
import BlogsSection from '../components/BlogsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  return (
    <>
      {/* Stick Header Navbar */}
      <Header onOpenAuth={openAuth} />

      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* 1. Strong Opening Hero Section */}
        <Hero onOpenAuth={openAuth} />

        {/* 2. Quick Value Snapshot */}
        <ValueSnapshot />

        {/* 3. Trust Grid Section */}
        <TrustSection />

        {/* 4. What is NextGen? & Vision Section */}
        <AboutSection onOpenAuth={openAuth} />

        {/* 4. Programs & Benefits Section */}
        <ProgramsSection onOpenAuth={openAuth} />

        {/* 5. Blogs & Career Insights Section */}
        <BlogsSection />

        {/* 7. Testimonials Section */}
        <TestimonialsSection />

        {/* 8. Bottom Call to Action */}
        <CTASection onOpenAuth={openAuth} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Authentications Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={closeAuth} />
    </>
  );
}
