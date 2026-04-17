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
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && bgRef.current) {
      // Create parallax timeline with smooth scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0
        }
      });

      // Background moves slower than scroll - classic parallax effect
      tl.fromTo(
        bgRef.current,
        { yPercent: -20 },
        { yPercent: 20, ease: "none" }
      );

      // Optional: slight overlay fade for depth
      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { opacity: 0.5 },
          { opacity: 0.7, ease: "none" },
          "<"
        );
      }
    }

    // Initialize Lenis for smooth scrolling (only once globally)
    let lenis: Lenis | null = null;
    if (typeof window !== 'undefined' && !window.lenisInstance) {
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
      // Clean up ScrollTrigger for this specific instance
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      id={id}
      ref={sectionRef} 
      className={`relative w-full overflow-hidden min-h-screen ${className}`}
    >
      {/* Background image layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          ref={bgRef}
          src={bgImage} 
          alt="" 
          aria-hidden="true"
          className="absolute top-[-25%] left-0 w-full h-[150%] object-cover object-center will-change-transform"
        />
        {/* Dark overlay for readability */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-background/60"
        />
      </div>
      
      {/* Content layer */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </section>
  );
}

// Type definition for global Lenis instance
declare global {
  interface Window {
    lenisInstance?: Lenis;
  }
}
