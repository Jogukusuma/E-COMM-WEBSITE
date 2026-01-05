
"use client";

import React, { useEffect, useState } from 'react';

export function ShinyDots() {
  const [dots, setDots] = useState<
    {
      top: string;
      left: string;
      size: number;
      delay: number;
      duration: number;
    }[]
  >([]);

  useEffect(() => {
    const generateDots = () => {
      const newDots = Array.from({ length: 50 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 3,
      }));
      setDots(newDots);
    };

    generateDots();
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/50 animate-twinkle"
          style={{
            top: dot.top,
            left: dot.left,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
