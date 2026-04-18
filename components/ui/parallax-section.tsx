'use client';

import React from 'react';

interface ParallaxSectionProps {
  id?: string;
  bgImage: string;
  children: React.ReactNode;
  className?: string;
}

export function ParallaxSection({ id, bgImage, children, className = '' }: ParallaxSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full ${className}`}
    >
      {/* Background image with CSS parallax effect */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-black/40" aria-hidden="true" />

      {/* Content layer */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
