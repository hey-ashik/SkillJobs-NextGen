import React from 'react';

export default function Logo({ light = false }) {
  const textColor = light ? 'var(--color-white)' : 'var(--color-dark-gray-1)';
  const separatorColor = light ? 'rgba(255,255,255,0.3)' : '#cbd5e1';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <svg
        width="100"
        height="36"
        viewBox="0 0 100 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Crisp text based rendering with styled tspans */}
        <text
          x="0"
          y="25"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="-0.5px"
        >
          <tspan fill="#1b4d9b">Sk</tspan>
          {/* We make the 'i' transparent to overlay our custom dotted-i and arrow */}
          <tspan fill="transparent">i</tspan>
          <tspan fill="#1b4d9b">ll</tspan>
          <tspan fill="#e11d48">.</tspan>
          <tspan fill={light ? '#ffffff' : '#0f172a'}>jobs</tspan>
        </text>

        {/* Custom styled 'i' vertical bar */}
        <rect x="25.5" y="12" width="4" height="13" rx="1" fill="#1b4d9b" />

        {/* Red Arrow swooping up from 'i' */}
        <path
          d="M 27.5 25 C 27.5 25, 29.5 15, 36.5 10 C 39.5 8, 43.5 7.5, 47.5 6.5 M 47.5 6.5 L 42.5 6 M 47.5 6.5 L 46.5 11.5"
          stroke="#e11d48"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dotted head for 'i' */}
        <circle cx="27.5" cy="8" r="2" fill="#e11d48" />
      </svg>

      <div
        style={{
          borderLeft: `1px solid ${separatorColor}`,
          paddingLeft: '8px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          marginLeft: '4px',
        }}
      >
        <span
          style={{
            fontSize: '16px',
            fontWeight: '900',
            fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
            letterSpacing: '-0.3px',
            color: light ? '#ffffff' : 'var(--color-royal-blue-1)',
            lineHeight: '1',
          }}
        >
          NextGen
        </span>
      </div>
    </div>
  );
}
