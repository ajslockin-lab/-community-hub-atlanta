"use client";

import { useEffect, useState } from "react";

const IMAGES = [
  "/images/atlanta-morning.jpg",
  "/images/atlanta-afternoon.jpg",
  "/images/atlanta-sunset.jpg",
  "/images/atlanta-night.jpg",
];

export const KenBurnsHero = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative flex flex-col justify-center items-center w-full min-h-[100dvh] overflow-hidden">
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10">{children}</div>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col justify-center items-center w-full min-h-[100dvh] overflow-hidden">
      {/* Ken Burns Background Images */}
      <div className="absolute inset-0">
        {IMAGES.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0"
            style={{
              animation: `kenBurnsZoom 18s ease-out ${index * 18}s infinite`,
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0,
              animationFillMode: "both",
            }}
          />
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45 z-[1]" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style>{`
        @keyframes kenBurnsZoom {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: scale(1.15) translate(1%, 1%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};
