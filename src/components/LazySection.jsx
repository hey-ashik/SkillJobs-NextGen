'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function LazySection({ children, threshold = 0.1, rootMargin = '80px' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={`lazy-section ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
}
