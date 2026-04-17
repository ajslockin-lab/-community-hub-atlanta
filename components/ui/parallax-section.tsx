'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

interface ParallaxSectionProps {
  id?: string;
  bgImage: string;
  children: React.ReactNode;
  className?: string;
}

export function ParallaxSection({ id, bgImage, children, className = "" }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && bgRef.current) {
      // Main parallax timeline for background
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        }
      });

      // More dramatic parallax movement with scale
      tl.fromTo(
        bgRef.current,
        { yPercent: -15, scale: 1.1 },
        { yPercent: 15, scale: 1, ease: "none" }
      );
    }

    // Only initialize Lenis once if not already initialized
    let lenis: Lenis | null = null;
    if (!window.lenisInstance) {
      lenis = new Lenis({
        smoothWheel: true,
      });
      window.lenisInstance = lenis;

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      // Cleanup happens globally or if this is the last component
      // We keep it simple here to avoid killing the global instance if others use it
    };
  }, []);

  return (
    <section 
      id={id}
      ref={sectionRef} 
      className={`relative w-full overflow-hidden min-h-screen ${className}`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          ref={bgRef}
          src={bgImage} 
          alt="" 
          aria-hidden="true"
          className="absolute top-[-20%] left-0 w-full h-[140%] object-cover object-center will-change-transform"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </section>
  );
}

// Add a type definition for the global window object to store the lenis instance
declare global {
  interface Window {
    lenisInstance?: Lenis;
  }
}
