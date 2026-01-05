
"use client";

import React, { useEffect, useState } from 'react';

export function ShinyDots() {
  const [stars, setStars] = useState<
    {
      top: string;
      left: string;
      size: number;
      delay: number;
      duration: number;
    }[]
  >([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 50 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 3,
      }));
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute text-white/80 animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            fontSize: `${star.size * 10}px`,
            lineHeight: '1',
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}
