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

// Module-level flag to ensure Lenis is only initialized once across all instances
let lenisInitialized = false;

export function ParallaxSection({ id, bgImage, children, className = '' }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis once globally for smooth scrolling
    let lenis: Lenis | null = null;
    if (!lenisInitialized) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      lenisInitialized = true;
    }

    // Set up parallax animation for this section's background
    let scrollTriggerInstance: ScrollTrigger | null = null;
    if (sectionRef.current && bgRef.current) {
      const tween = gsap.fromTo(
        bgRef.current,
        { yPercent: -20 },
        {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
      scrollTriggerInstance = tween.scrollTrigger ?? null;
    }

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* Background image layer with parallax */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          ref={bgRef}
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="absolute top-[-20%] left-0 w-full h-[140%] object-cover object-center will-change-transform"
        />
        {/* Gradient overlay for content readability */}
        <div className="absolute inset-0 bg-background/55" />
      </div>

      {/* Content layer */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
