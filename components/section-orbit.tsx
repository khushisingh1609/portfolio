'use client';

import React from 'react';

export type OrbitVariant = 'about' | 'skills' | 'projects' | 'certifications' | 'achievements' | 'contact';

interface SectionOrbitProps {
  variant: OrbitVariant;
  className?: string;
}

export const SectionOrbit: React.FC<SectionOrbitProps> = ({ variant, className = '' }) => {
  // REDUCED height to 55-60px so it perfectly hugs the text vertically without hitting labels
  const configs = {
    about: { width: 220, height: 55, duration: '8s' },
    skills: { width: 480, height: 60, duration: '12s' }, 
    projects: { width: 380, height: 55, duration: '10s' },
    certifications: { width: 600, height: 65, duration: '14s' }, // <-- Expanded width!
    achievements: { width: 500, height: 65, duration: '10s' },
    contact: { width: 300, height: 65, duration: '8s' }
  };

  const config = configs[variant];
  
  const cx = 300;
  const cy = 80;
  const x = cx - config.width / 2;
  const y = cy - config.height / 2;
  const cornerRadius = config.height / 2; // Dynamically ensures a perfect pill shape

  return (
    <div 
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center w-[350px] sm:w-[600px] lg:w-[800px] ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 w-full h-full mix-blend-screen opacity-80"
        style={{
          background: `radial-gradient(ellipse at center, rgba(244, 114, 182, 0.15) 0%, rgba(13, 17, 23, 0) 60%)`
        }}
      />

      <svg
        viewBox="0 0 600 160"
        className="absolute w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect
          x={x}
          y={y}
          width={config.width}
          height={config.height}
          rx={cornerRadius}
          fill="none"
          stroke="rgba(244, 114, 182, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
        
        <rect
          x={x}
          y={y}
          width={config.width}
          height={config.height}
          rx={cornerRadius}
          fill="none"
          stroke="#F472B6"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="15 85"
          className="box-light"
          style={{ '--orbit-duration': config.duration } as React.CSSProperties}
        />
      </svg>

      <style>{`
        .box-light {
          animation: orbit-spin var(--orbit-duration) linear infinite;
          filter: drop-shadow(0 0 6px rgba(244, 114, 182, 0.8)) drop-shadow(0 0 12px rgba(244, 114, 182, 0.5));
        }
        
        @keyframes orbit-spin {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .box-light {
            animation: none;
            stroke-dashoffset: 25;
          }
        }
      `}</style>
    </div>
  );
}